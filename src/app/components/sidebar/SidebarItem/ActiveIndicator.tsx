import { useEffect, useRef } from 'react';
import { useActiveIndicator } from './ActiveIndicatorContext';
import * as css from './ActiveIndicator.css';

export function ActiveIndicator() {
  const ctx = useActiveIndicator();
  const ref = useRef<HTMLDivElement>(null);
  const restoreTransitionRef = useRef<number | null>(null);
  const scrollingRef = useRef(false);

  useEffect(() => {
    if (!ctx) return;
    const indicator = ref.current;
    if (!indicator) return;
    const sidebar = indicator.parentElement;
    if (!sidebar) return;

    const update = (animate = true) => {
      const active = ctx.getActiveElement();
      if (!active) {
        indicator.style.opacity = '0';
        return;
      }

      if (!animate || scrollingRef.current) {
        indicator.style.transition = 'none';
      } else {
        indicator.style.removeProperty('transition');
      }

      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const top = activeRect.top - sidebarRect.top + activeRect.height / 2 - indicator.offsetHeight / 2;
      indicator.style.opacity = '1';
      indicator.style.top = `${top}px`;
    };

    const unsubscribe = ctx.subscribe(() => update(true));
    update();

    // Track scroll within the sidebar
    const scrollables = sidebar.querySelectorAll<HTMLElement>(
      '[class*="Scroll"], [class*="SidebarScrollArea"]'
    );
    const handleScroll = () => {
      scrollingRef.current = true;
      if (restoreTransitionRef.current !== null) {
        clearTimeout(restoreTransitionRef.current);
      }
      update(false);
      restoreTransitionRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
        indicator.style.removeProperty('transition');
        restoreTransitionRef.current = null;
      }, 80);
    };
    scrollables.forEach((el) => el.addEventListener('scroll', handleScroll, { passive: true }));

    return () => {
      unsubscribe();
      if (restoreTransitionRef.current !== null) {
        clearTimeout(restoreTransitionRef.current);
      }
      scrollables.forEach((el) => el.removeEventListener('scroll', handleScroll));
    };
  }, [ctx]);

  return <div ref={ref} className={css.ActiveIndicator} />;
}
