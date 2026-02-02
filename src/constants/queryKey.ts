/**
 * TanStack Query 키 관리
 * - 쿼리 키는 배열로 통일 (useQuery/useInfiniteQuery queryKey)
 * - 파라미터가 있는 키는 팩토리 함수로 export
 */

export const queryKeys = {
  tags: ["tags"] as const,

  posts: {
    all: ["posts"] as const,
    list: (tagIdsKey: string) => ["posts", "list", tagIdsKey] as const,
    detail: (postIndex: number) => ["post", postIndex] as const,
    recent: (size: number, offset: number) => ["recentPosts", size, offset] as const,
  },

  comments: (postIndex: number) => ["comments", postIndex] as const,

  weather: (lat: number, lon: number) => ["weather", lat, lon] as const,

  city: (lat: number, lon: number) => ["city", lat, lon] as const,
} as const;
