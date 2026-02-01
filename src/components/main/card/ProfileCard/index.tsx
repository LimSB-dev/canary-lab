"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

/** 커서 방향으로 이미지가 기울어지는 최대 각도(deg) */
const MAX_TILT_DEG = 14;

export const ProfileCard = () => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef<number | null>(null);

  const latestRef = useRef({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const halfW = Math.max(rect.width / 2, 1);
      const halfH = Math.max(rect.height / 2, 1);
      const normX = Math.max(-1.2, Math.min(1.2, dx / halfW));
      const normY = Math.max(-1.2, Math.min(1.2, dy / halfH));
      latestRef.current = {
        rotateY: normX * MAX_TILT_DEG,
        rotateX: -normY * MAX_TILT_DEG,
      };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setTilt(latestRef.current);
          rafRef.current = null;
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as Node).nodeName === "HTML") {
        latestRef.current = { rotateX: 0, rotateY: 0 };
        setTilt({ rotateX: 0, rotateY: 0 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <article ref={cardRef} className={styles.card}>
      <div className={styles.perspective_wrap}>
        <div
          className={styles.image_wrap}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
        >
          <Image
            src="/assets/images/memoji.png"
            alt={t("main.profileCard.alt")}
            width={200}
            height={200}
          />
        </div>
      </div>
    </article>
  );
};
