import { ComponentProps, useEffect, useRef } from 'react';
import { subscribeToLivePointer, unsubscribeFromLivePointer } from '$utils/livePointerTracker';

type BackgroundGlowProps = ComponentProps<'div'> & {
  color: string;
};

export function BackgroundGlow({ color, style, ...props }: BackgroundGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointer = (x: number, y: number) => {
      if (!internalGlowRef.current) return;
      const parentRect = containerRef.current?.getBoundingClientRect();
      if (!parentRect) return;
      internalGlowRef.current.style.left = `${x - parentRect.left}px`;
      internalGlowRef.current.style.top = `${y - parentRect.top}px`;
    };

    subscribeToLivePointer(handlePointer);

    return () => {
      unsubscribeFromLivePointer(handlePointer);
    };
  }, []);

  return (
    <div
      {...props}
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        ref={internalGlowRef}
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          aspectRatio: '1 / 2',
          background: `radial-gradient(circle closest-side at center, ${color} 0%, rgba(0, 0, 0, 0) 100%)`,
        }}
      />
    </div>
  );
}
