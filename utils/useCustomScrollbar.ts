import { useEffect, RefObject } from "react";

export const useCustomScrollbar = (
  listRef: RefObject<HTMLElement | null>,
  thumbRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    if (!list || !thumb) return;

    const onScroll = () => {
      const maxScroll = list.scrollWidth - list.clientWidth;
      if (maxScroll <= 0) return;

      const progress = list.scrollLeft / maxScroll;
      const track = thumb.parentElement;
      if (!track) return;

      const maxMove = track.offsetWidth - thumb.offsetWidth;
      thumb.style.transform = `translateX(${progress * maxMove}px)`;
    };

    list.addEventListener("scroll", onScroll);
    return () => list.removeEventListener("scroll", onScroll);
  }, [listRef, thumbRef]);
};
