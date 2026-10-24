import { useEffect, useRef } from 'react';

/**
 * The original Syncora cursor: a 32px white dot with difference blending that
 * grows and fades over interactive elements. Elements carrying data-cursor
 * ("View") also get a lime label pill, drawn outside the blend layer so the
 * accent stays true. Position is written straight to the DOM instead of
 * through state, so the page never re-renders while the pointer moves.
 */
const CustomCursor = () => {
  const blendRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const blend = blendRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!blend || !dot || !ring || !label) return undefined;

    let visible = false;
    let hovering = false;
    let labelText = '';
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      dot.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      ring.style.transform = `translate3d(${x - 32}px, ${y - 32}px, 0) scale(${hovering ? 1.6 : 1})`;
      ring.style.opacity = labelText ? '0' : hovering ? '0.35' : '1';
      label.style.transform = `translate3d(${x - 34}px, ${y - 14}px, 0)`;
      frame = 0;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const handleMouseMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        blend.style.opacity = '1';
        label.style.opacity = labelText ? '1' : '0';
      }
      schedule();
    };

    const handleMouseOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const tagged = target && target.closest('[data-cursor]');
      const nextLabel = tagged ? tagged.getAttribute('data-cursor') || '' : '';
      const nextHover = Boolean(target && target.closest('a, button, input, select, textarea'));

      if (nextLabel === labelText && nextHover === hovering) return;

      labelText = nextLabel;
      hovering = nextHover;

      label.textContent = labelText;
      label.style.opacity = visible && labelText ? '1' : '0';
      dot.style.opacity = labelText ? '0' : '1';
      schedule();
    };

    const handleLeave = () => {
      blend.style.opacity = '0';
      label.style.opacity = '0';
      visible = false;
      labelText = '';
      hovering = false;
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <div
        ref={blendRef}
        className="absolute inset-0 opacity-0 mix-blend-difference transition-opacity duration-300"
      >
        <div
          ref={ringRef}
          className="absolute left-0 top-0 h-16 w-16 rounded-full border border-white opacity-100 transition-opacity duration-300"
          style={{ transitionProperty: 'opacity' }}
        />
        <div ref={dotRef} className="absolute left-0 top-0 h-8 w-8 rounded-full bg-white" />
      </div>
      <span
        ref={labelRef}
        className="absolute left-0 top-0 flex h-7 w-[68px] items-center justify-center rounded-full bg-accent font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-200"
      />
    </div>
  );
};

export default CustomCursor;