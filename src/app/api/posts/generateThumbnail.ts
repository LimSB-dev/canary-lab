"use server";

import OpenAI from "openai";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { getPost } from "./getPost";
import { ensurePostsThumbnailColumn } from "@/utils/ensurePostsThumbnailColumn";

const PROMPT_MAX_LENGTH = 800;
const CONTENT_SUMMARY_MAX = 400;

/** 마크다운 제거 후 짧은 요약 텍스트 생성 */
function toPlainSummary(content: string, maxLen: number): string {
  const plain = content
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`[^`]+`/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length <= maxLen ? plain : plain.slice(0, maxLen) + "...";
}

/**
 * 게시글 제목·내용(또는 customPrompt)을 바탕으로 AI 썸네일 이미지를 생성해 Blob에 저장하고 posts.thumbnail_url을 갱신합니다.
 * customPrompt가 있으면 그대로 사용하고, 없으면 제목·내용 요약으로 기본 프롬프트를 만듭니다.
 * 환경 변수 OPENAI_API_KEY, BLOB_READ_WRITE_TOKEN 필요.
 */
export async function generatePostThumbnail(
  postIndex: number,
  customPrompt?: string | null
): Promise<string> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("OPENAI_API_KEY가 설정되지 않았습니다. .env에 추가해 주세요.");
  }

  const post = await getPost(postIndex);
  const summary = toPlainSummary(post.content, CONTENT_SUMMARY_MAX);

  const prompt =
    customPrompt?.trim() ||
    `Create a single, clean blog post thumbnail image. Title: ${post.title}. Content summary: ${summary}. Style: modern, minimal, suitable for a tech blog. No text in the image.`;
  const finalPrompt = prompt.slice(0, PROMPT_MAX_LENGTH);

  let imageUrl: string;
  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });
    imageUrl = response.data?.[0]?.url ?? "";
  } catch (err: unknown) {
    const status = err && typeof err === "object" && "status" in err ? (err as { status: number }).status : null;
    const msg = err instanceof Error ? err.message : String(err ?? "");
    const isQuotaOr429 = status === 429 || /quota|billing|exceeded/i.test(msg);
    throw new Error(
      isQuotaOr429
        ? "OpenAI 사용 한도를 초과했거나 결제 정보가 없습니다. 이미지 API는 유료입니다. Billing(https://platform.openai.com/account/billing)에서 확인해 주세요."
        : msg || "이미지 생성에 실패했습니다."
    );
  }

  if (!imageUrl) {
    throw new Error("이미지 생성에 실패했습니다.");
  }

  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    throw new Error("생성된 이미지를 가져오지 못했습니다.");
  }
  const buffer = Buffer.from(await imageRes.arrayBuffer());
  const filename = `posts/${postIndex}/thumbnail-${Date.now()}.png`;
  const blob = await put(filename, buffer, {
    access: "public",
    contentType: "image/png",
  });

  await ensurePostsThumbnailColumn();
  await sql`
    UPDATE posts SET thumbnail_url = ${blob.url} WHERE index = ${postIndex}
  `;

  revalidatePath(`/posts/${postIndex}`);
  revalidatePath("/posts");
  revalidatePath("/");

  return blob.url;
}
