import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf", // PDF
            "text/plain", // Plain text
            "image/webp", // WebP images
            "application/json", // JSON
          ],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          // Blob 업로드 완료 후 처리 로직 추가
          // 필요시 여기에 추가 로직 구현
        } catch (error) {
          console.error("Error in onUploadCompleted:", error);
          // 에러가 발생해도 업로드는 완료되었으므로 계속 진행
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
