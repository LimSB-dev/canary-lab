const MICROLINK_API = "https://api.microlink.io";

export type ProjectPreview = {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
};

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * URL의 SEO(Open Graph) 메타를 Microlink API로 조회합니다.
 * og:image가 없으면 screenshot=true로 메인 화면 스크린샷 URL을 반환합니다.
 * 서버 전용 (API 라우트·Server Component에서 사용).
 */
export async function getProjectPreview(url: string): Promise<ProjectPreview | null> {
  if (!url || !isValidUrl(url)) return null;

  try {
    const apiUrl = new URL(MICROLINK_API);
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("screenshot", "true");

    const res = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "success" || !data.data) return null;

    const d = data.data;
    const image = d.image?.url ?? d.screenshot?.url ?? null;

    return {
      url: d.url ?? url,
      title: d.title ?? null,
      description: d.description ?? null,
      image,
    };
  } catch {
    return null;
  }
}

/** 여러 URL의 미리보기를 한 번에 조회 (서버 전용) */
export async function getProjectPreviews(urls: string[]): Promise<ProjectPreview[]> {
  const results = await Promise.all(urls.map((url) => getProjectPreview(url)));
  return results.filter((p): p is ProjectPreview => p !== null);
}
