"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Media-query hook built on `useSyncExternalStore`.
 *
 * Reading the value during render instead of inside an effect means no
 * cascading render on mount, and the server snapshot stays stable for SSR.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on screens that have room for the denser layout and a precise pointer. */
export function useRichPointer() {
  return useMediaQuery("(min-width: 768px) and (pointer: fine)");
}

/**
 * Reports whether the observed element is currently intersecting the viewport.
 * Used to stop the 3D render loop once the hero has scrolled out of view.
 */
export function useElementVisible<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return { ref, visible };
}
