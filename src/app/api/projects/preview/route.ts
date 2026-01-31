import { NextRequest, NextResponse } from "next/server";
import { getProjectPreview } from "../getPreview";

export type { ProjectPreview } from "../getPreview";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "유효한 url 쿼리가 필요합니다." },
      { status: 400 }
    );
  }

  const payload = await getProjectPreview(url);
  if (!payload) {
    return NextResponse.json(
      { error: "미리보기를 가져올 수 없습니다." },
      { status: 502 }
    );
  }

  return NextResponse.json(payload);
}
