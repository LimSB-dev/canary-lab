"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import styles from "./styles.module.scss";

/** 애니메이션 타이밍 설정 (상수 CARD_SWAP_ANIMATION에서 사용) */
export interface CardSwapAnimationConfig {
  ease: string;
  durDrop: number;
  durMove: number;
  durReturn: number;
  promoteOverlap: number;
  returnDelay: number;
  /** 다음 스왑까지 대기(ms). 애니메이션 길이 이상이어야 함 */
  intervalMs: number;
}

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  /** 상수에서 넘기면 이 값을 사용 (easing 무시) */
  animationConfig?: CardSwapAnimationConfig;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={`${styles.card} ${customClass ?? ""} ${className ?? ""}`.trim()}
      {...rest}
    />
  )
);
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const DEFAULT_ANIMATION = {
  elastic: {
    ease: "elastic.out(0.6,0.9)" as const,
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
  },
  linear: {
    ease: "power1.inOut" as const,
    durDrop: 0.8,
    durMove: 0.8,
    durReturn: 0.8,
    promoteOverlap: 0.45,
    returnDelay: 0.2,
  },
} as const;

const DEFAULT_ANIMATION_WITH_INTERVAL = {
  elastic: { ...DEFAULT_ANIMATION.elastic, intervalMs: 4500 },
  linear: { ...DEFAULT_ANIMATION.linear, intervalMs: 3000 },
} as const;

export const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  animationConfig,
  children,
}) => {
  const config = useMemo(
    () =>
      animationConfig ??
      (easing === "elastic" ? DEFAULT_ANIMATION.elastic : DEFAULT_ANIMATION.linear),
    [animationConfig, easing]
  );
  const intervalMs =
    animationConfig && "intervalMs" in animationConfig
      ? animationConfig.intervalMs
      : (delay ??
        (easing === "elastic"
          ? DEFAULT_ANIMATION_WITH_INTERVAL.elastic.intervalMs
          : DEFAULT_ANIMATION_WITH_INTERVAL.linear.intervalMs));

  const childArr = useMemo(() => Children.toArray(children) as ReactElement[], [children]);
  const refs = useMemo<RefObject<HTMLDivElement>[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, intervalMs);

    if (pauseOnHover) {
      const node = containerRef.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, intervalMs);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, intervalMs, pauseOnHover, skewAmount, easing, config, refs]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: {
            width,
            height,
            ...((child.props as { style?: React.CSSProperties }).style ?? {}),
          },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            (
              child.props as {
                onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
              }
            ).onClick?.(e);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div ref={containerRef} className={styles.card_swap_container} style={{ width, height }}>
      {rendered}
    </div>
  );
};
