/**
 * Card Swap 커스텀 설정
 * 예정된 프로젝트 섹션의 카드 스왑 애니메이션을 한 곳에서 관리합니다.
 * @see https://reactbits.dev/components/card-swap
 *
 * ⚠️ delay(intervalMs)는 애니메이션 길이와 묶여 있음.
 *    intervalMs < (durDrop + durMove + durReturn) 이면 다음 스왑이 끝나기 전에
 *    시작되어 꼬이므로, 반드시 프리셋 안의 intervalMs만 사용함.
 */

/** 카드 한 장 크기 (px) */
export const CARD_SWAP_CARD_WIDTH = 340;
export const CARD_SWAP_CARD_HEIGHT = 320;

/** 카드 간 겹침/간격 (px) - 클수록 스택이 더 벌어져 보임 */
export const CARD_SWAP_CARD_DISTANCE = 56;
export const CARD_SWAP_VERTICAL_DISTANCE = 64;

/** 카드 기울기 (deg) - 스택 입체감 */
export const CARD_SWAP_SKEW_AMOUNT = 6;

/** 애니메이션 이징: "elastic" | "linear" (프리셋 선택 시 intervalMs 포함) */
export const CARD_SWAP_EASING = "elastic" as const;

/** 호버 시 애니메이션 일시정지 */
export const CARD_SWAP_PAUSE_ON_HOVER = true;

/**
 * 래퍼 기본 참고값 (데스크톱).
 * 실제 반응형 크기는 ProjectsSection/styles.module.scss .card_swap_wrap 에서
 * 브레이크포인트(804, 1212, 1620)별로 적용됨.
 */
export const CARD_SWAP_WRAP = {
  maxWidthPx: 520,
  heightPx: 380,
} as const;

/**
 * 애니메이션 프리셋 (타이밍 + 넘김 간격 한 세트)
 * - intervalMs: 다음 스왑까지 대기(ms). 반드시 durDrop+durMove+durReturn 보다 커야 함.
 * - 개별 수정 시 intervalMs 는 애니메이션 길이에 맞춰 조정할 것.
 */
export const CARD_SWAP_ANIMATION = {
  elastic: {
    ease: "elastic.out(0.6,0.9)" as const,
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
    /** 다음 스왑까지 대기(ms). 애니메이션 총 길이(~6s) 이상 권장 */
    intervalMs: 4500,
  },
  linear: {
    ease: "power1.inOut" as const,
    durDrop: 0.8,
    durMove: 0.8,
    durReturn: 0.8,
    promoteOverlap: 0.45,
    returnDelay: 0.2,
    /** 다음 스왑까지 대기(ms). 애니메이션 총 길이(~2.5s) 이상 권장 */
    intervalMs: 3000,
  },
} as const;
