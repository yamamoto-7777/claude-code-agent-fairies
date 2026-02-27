"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook that adds scroll-reveal behavior using IntersectionObserver.
 * When 15% of the element is visible in the viewport, the "is-visible" class
 * is toggled on, triggering CSS transitions defined in globals.css.
 *
 * Usage:
 * ```tsx
 * const ref = useScrollReveal<HTMLDivElement>();
 * return <div ref={ref} className="scroll-reveal">...</div>;
 * ```
 */
export function useScrollReveal<
  T extends HTMLElement = HTMLDivElement,
>(): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return ref;
}
