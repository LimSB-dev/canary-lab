"use server";

import OpenAI from "openai";
import { auth } from "@/auth";

const PROMPT_MAX_LENGTH = 2000;

/**
 * 사용자가 입력한 프롬프트를 바탕으로 AI가 블로그 게시글용 마크다운 본문을 생성합니다.
 * OPENAI_API_KEY 환경 변수 필요. (채팅 API는 무료 크레딧으로 사용 가능한 경우 있음)
 */
export async function generateMarkdownFromPrompt(
  userPrompt: string
): Promise<string> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: 로그인이 필요합니다.");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("OPENAI_API_KEY가 설정되지 않았습니다. .env에 추가해 주세요.");
  }

  const trimmed = userPrompt.trim();
  if (!trimmed) {
    throw new Error("프롬프트를 입력해 주세요.");
  }

  const prompt = trimmed.slice(0, PROMPT_MAX_LENGTH);

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a blog post writer. Write the article body only in Markdown format. Use headings (##, ###), lists, bold, code blocks, and links as appropriate. Do not include a title in the output. Output only the markdown content, no preamble or explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("마크다운 생성에 실패했습니다.");
    }

    return content;
  } catch (err: unknown) {
    const status = err && typeof err === "object" && "status" in err ? (err as { status: number }).status : null;
    const msg = err instanceof Error ? err.message : String(err ?? "");
    const isQuotaOr429 = status === 429 || /quota|billing|exceeded/i.test(msg);

    const message = isQuotaOr429
      ? "OpenAI 사용 한도를 초과했거나 결제 정보가 없습니다. Billing(https://platform.openai.com/account/billing)에서 확인해 주세요."
      : msg || "마크다운 생성에 실패했습니다.";
    throw new Error(message);
  }
}
