import { useEffect, RefObject, useRef } from "react";

type Direction = "left" | "right";

interface UseSmoothScrollOptions {
  slidesToScroll?: number;
  gap?: number;
  duration?: number;
}

export const useSmoothScroll = (
  containerRef: RefObject<HTMLElement | null>,
  options: UseSmoothScrollOptions = {}
) => {
  const { slidesToScroll = 1, gap = 1, duration = 500 } = options;
  const isScrollingRef = useRef(false);

  const scrollSmooth = (direction: Direction) => {
    const container = containerRef.current;
    if (!container || isScrollingRef.current) return;

    const slide = container.firstElementChild as HTMLElement | null;
    if (!slide) return;

    const style = getComputedStyle(slide);
    const marginRight = parseInt(style.marginRight) || 0;
    const slideWidth = slide.offsetWidth + marginRight;

    const distance = slidesToScroll * slideWidth;
    const start = container.scrollLeft;
    const target = direction === "right" ? start + distance : start - distance;

    const startTime = performance.now();
    isScrollingRef.current = true;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutQuad
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      container.scrollLeft = start + (target - start) * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        container.scrollLeft = target;
        isScrollingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft") scrollSmooth("left");
      if (e.key === "ArrowRight") scrollSmooth("right");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return { scrollSmooth };
};
