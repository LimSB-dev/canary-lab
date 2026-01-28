"use client";

import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import styles from "./styles.module.scss";

import {
  ArrowCard,
  PopularPostCard,
  RecentCard,
  RecentPostCard,
  ResetCard,
  SkeletonPostCard,
} from "@/components/main/card";
import { useAppSelector } from "@/hooks/reduxHook";
import { useDevice } from "@/hooks/useDevice";

const RecentPostSection = ({
  recentPosts,
  size,
  isLoading,
  error,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  error: string | null;
}) => {
  // 로딩 중일 때는 항상 스켈레톤 UI 표시
  if (isLoading) {
    return Array.from({ length: size }, (_, index) => (
      <SkeletonPostCard key={`skeleton-${index}`} />
    ));
  }

  // 에러가 발생한 경우
  if (error) {
    return (
      <div style={{ padding: "16px", color: "var(--error-color)" }}>
        <p>오류: {error}</p>
        <p style={{ fontSize: "var(--caption)", marginTop: "8px" }}>
          게시글을 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  // 로딩이 완료되었지만 게시글이 없을 때
  if (isEmpty(recentPosts)) {
    return (
      <div style={{ padding: "16px", textAlign: "center" }}>
        최근 게시글이 없습니다.
      </div>
    );
  }

  // 게시글 표시
  return recentPosts
    .slice(0, size)
    .map((post) => <RecentPostCard key={post.id} post={post} />);
};

const MobilePostContainer = ({
  popularPosts,
  recentPosts,
  size,
  isLoading,
  error,
}: {
  popularPosts: IPost[];
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <div className={styles.post_controller}>
      <PopularPostCard popularPosts={popularPosts} />
      <section className={styles.post_section}>
        <div className={styles.post_controller}>
          <RecentCard />
          <ResetCard />
          <ArrowCard />
        </div>
        <RecentPostSection
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </div>
  );
};

const TabletPostContainer = ({
  recentPosts,
  size,
  isLoading,
  error,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <section className={styles.post_section}>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

const LaptopPostContainer = ({
  recentPosts,
  size,
  isLoading,
  error,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

const DesktopPostContainer = ({
  recentPosts,
  size,
  isLoading,
  error,
}: {
  recentPosts: IPost[];
  size: number;
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <section className={styles.post_section}>
      <div className={styles.post_controller}>
        <RecentCard />
        <ResetCard />
        <ArrowCard />
      </div>
      <RecentPostSection
        recentPosts={recentPosts}
        size={size}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

export const PostContainer = ({ popularPosts }: { popularPosts: IPost[] }) => {
  const offset = useAppSelector((state) => state.post.offset) ?? 0;
  const deviceType = useDevice();
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  // 초기 로딩 상태를 true로 설정하여 첫 렌더링 시 스켈레톤 UI 표시
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const size = useMemo(() => {
    switch (deviceType) {
      case "min":
      case "mobile":
        return 1;
      case "tablet":
        return 3;
      case "laptop":
      case "desktop":
        return 4;
      case "max":
      default:
        return 5;
    }
  }, [deviceType]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/posts/recent?size=${size}&offset=${offset}`,
          { signal }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const posts = await response.json();
        
        // 응답이 배열인지 확인
        if (!Array.isArray(posts)) {
          console.error("Invalid response format:", posts);
          setError("잘못된 응답 형식입니다.");
          setRecentPosts([]);
        } else {
          setRecentPosts(posts);
        }
        setIsLoading(false);
      } catch (error) {
        // AbortError는 정상적인 취소이므로 무시 (상태 업데이트 안 함)
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request aborted:", error.message);
          return; // AbortError는 상태를 변경하지 않음
        }
        
        // 실제 에러인 경우에만 상태 업데이트
        console.error("Fetch error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "게시글을 불러오는 중 오류가 발생했습니다."
        );
        setRecentPosts([]);
        setIsLoading(false);
      }
    }
    fetchPosts();

    return () => controller.abort();
  }, [size, offset]);

  switch (deviceType) {
    case "mobile":
      return (
        <MobilePostContainer
          popularPosts={popularPosts}
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          error={error}
        />
      );
    case "tablet":
      return (
        <TabletPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          error={error}
        />
      );
    case "laptop":
      return (
        <LaptopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          error={error}
        />
      );
    case "desktop":
      return (
        <DesktopPostContainer
          recentPosts={recentPosts}
          size={size}
          isLoading={isLoading}
          error={error}
        />
      );
    default:
      return null;
  }
};
