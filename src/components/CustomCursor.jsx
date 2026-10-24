import { useEffect, useRef } from 'react';

/**
 * Signature Syncora Custom Cursor
 *
 * Visual System:
 * - Luminous 6px lime accent dot (#d7ff45) at pointer core.
 * - Smooth lerp-following 36px outer ring with subtle backdrop blur & lime glow.
 * - Contextual data-cursor pill expansion ("VIEW", "EXPLORE", etc.) outside difference layer.
 * - Scale transformations over interactive buttons/links (1.4x scale) and text inputs (subtle vertical bar mode).
 * - Zero React re-renders on mouse movement (direct RAF DOM writes).
 * - Full media query protection for fine-pointer & prefers-reduced-motion.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reduceMotion.matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return undefined;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isInputHover = false;
    let labelText = '';
    let rafId = 0;

    const render = () => {
      // Smooth linear interpolation for the outer ring (0.18 ease)
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      // Inner dot tracks exact pointer instantly
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0) scale(${
        labelText ? 0 : isInputHover ? 0.5 : 1
      })`;

      // Outer ring follows lerp coordinates with scale expansion
      let ringScale = 1;
      if (labelText) ringScale = 0;
      else if (isInputHover) ringScale = 0.6;
      else if (isHoveringInteractive) ringScale = 1.45;

      ring.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0) scale(${ringScale})`;
      ring.style.borderColor = isHoveringInteractive ? 'rgba(215, 255, 69, 0.85)' : 'rgba(255, 255, 255, 0.35)';
      ring.style.backgroundColor = isHoveringInteractive ? 'rgba(215, 255, 69, 0.08)' : 'transparent';

      // Label pill position tracks lerp coordinates smoothly
      label.style.transform = `translate3d(${currentX - 42}px, ${currentY - 15}px, 0)`;

      if (isVisible) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const tagged = target.closest('[data-cursor]');
      const nextLabel = tagged ? tagged.getAttribute('data-cursor') || '' : '';
      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      const inputField = target.closest('input, textarea, select');

      const nextHoverInteractive = Boolean(interactive);
      const nextInputHover = Boolean(inputField);

      if (
        nextLabel === labelText &&
        nextHoverInteractive === isHoveringInteractive &&
        nextInputHover === isInputHover
      ) {
        return;
      }

      labelText = nextLabel;
      isHoveringInteractive = nextHoverInteractive;
      isInputHover = nextInputHover;

      if (labelText) {
        label.textContent = labelText;
        label.style.opacity = '1';
      } else {
        label.style.opacity = '0';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      label.style.opacity = '0';
      if (rafId) cancelAnimationFrame(rafId);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Luminous Lime Center Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(215,255,69,0.8)] opacity-0 transition-opacity duration-300"
      />

      {/* Outer Ring with Lerp & Subtle Glow */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/35 opacity-0 transition-[border-color,background-color,opacity] duration-300 will-change-transform"
      />

      {/* Contextual Label Pill (Lime Tag) */}
      <span
        ref={labelRef}
        className="absolute left-0 top-0 flex h-7.5 items-center justify-center rounded-full bg-accent px-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink opacity-0 shadow-[0_4px_16px_rgba(215,255,69,0.3)] transition-opacity duration-200"
      />
    </div>
  );
};

export default CustomCursor;
