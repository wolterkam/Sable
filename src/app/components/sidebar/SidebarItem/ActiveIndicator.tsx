import { useEffect, useRef } from 'react';
import { useActiveIndicator } from './ActiveIndicatorContext';
import * as css from './ActiveIndicator.css';

export function ActiveIndicator() {
  const ctx = useActiveIndicator();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx) return;
    const indicator = ref.current;
    if (!indicator) return;
    const sidebar = indicator.parentElement;
    if (!sidebar) return;

    const update = () => {
      const active = ctx.getActiveElement();
      if (!active) {
        indicator.style.opacity = '0';
        return;
      }
      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const top = activeRect.top - sidebarRect.top + activeRect.height / 2 - indicator.offsetHeight / 2;
      indicator.style.opacity = '1';
      indicator.style.top = `${top}px`;
    };

    const unsubscribe = ctx.subscribe(update);
    update();

    // Track scroll within the sidebar
    const scrollables = sidebar.querySelectorAll<HTMLElement>('[class*="Scroll"]');
    scrollables.forEach((el) => el.addEventListener('scroll', update, { passive: true }));

    return () => {
      unsubscribe();
      scrollables.forEach((el) => el.removeEventListener('scroll', update));
    };
  }, [ctx]);

  return <div ref={ref} className={css.ActiveIndicator} />;
}
