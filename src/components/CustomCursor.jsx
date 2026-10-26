import { useEffect, useRef } from 'react';

/**
 * Signature Syncora Custom Cursor with Laseric Trail & Sparks
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const trailContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reduceMotion.matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const trailContainer = trailContainerRef.current;

    if (!dot || !ring || !label || !trailContainer) return undefined;

    document.documentElement.classList.add('custom-cursor-active');

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let lastSpawnX = -100;
    let lastSpawnY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isInputHover = false;
    let labelText = '';
    let rafId = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      // Inner dot tracks exact pointer instantly
      dot.style.transform = 'translate3d(' + (targetX - 3) + 'px, ' + (targetY - 3) + 'px, 0) scale(' + (labelText ? 0 : isInputHover ? 0.5 : 1) + ')';

      // Outer ring follows lerp coordinates with scale expansion
      let ringScale = 1;
      if (labelText) ringScale = 0;
      else if (isInputHover) ringScale = 0.6;
      else if (isHoveringInteractive) ringScale = 1.45;

      ring.style.transform = 'translate3d(' + (currentX - 18) + 'px, ' + (currentY - 18) + 'px, 0) scale(' + ringScale + ')';
      ring.style.borderColor = isHoveringInteractive ? 'rgba(215, 255, 69, 0.9)' : 'rgba(255, 255, 255, 0.4)';
      ring.style.backgroundColor = isHoveringInteractive ? 'rgba(215, 255, 69, 0.1)' : 'transparent';

      // Label pill position
      label.style.transform = 'translate3d(' + (currentX - 42) + 'px, ' + (currentY - 15) + 'px, 0)';

      // Spawn laser sparkle particle if moved enough distance
      const dist = Math.hypot(targetX - lastSpawnX, targetY - lastSpawnY);
      if (dist > 18 && isVisible) {
        lastSpawnX = targetX;
        lastSpawnY = targetY;
        spawnSparkle(targetX, targetY);
      }

      if (isVisible) {
        rafId = requestAnimationFrame(render);
      }
    };

    const spawnSparkle = (x, y) => {
      if (!trailContainer) return;
      const spark = document.createElement('span');
      spark.className = 'absolute pointer-events-none rounded-full bg-accent';
      const size = Math.random() * 4 + 2;
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      spark.style.boxShadow = '0 0 10px #d7ff45, 0 0 20px #d7ff45';
      spark.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

      const offsetX = (Math.random() - 0.5) * 24;
      const offsetY = (Math.random() - 0.5) * 24;
      spark.style.transform = 'translate(-50%, -50%) translate(' + offsetX + 'px, ' + offsetY + 'px) scale(0.2)';
      spark.style.opacity = '0.9';

      trailContainer.appendChild(spark);

      requestAnimationFrame(() => {
        const finalX = (Math.random() - 0.5) * 40;
        const finalY = (Math.random() - 0.5) * 40;
        spark.style.transform = 'translate(-50%, -50%) translate(' + finalX + 'px, ' + finalY + 'px) scale(0)';
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        spark.remove();
      }, 500);
    };

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        lastSpawnX = targetX;
        lastSpawnY = targetY;
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
      document.documentElement.classList.remove('custom-cursor-active');
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Sparkles / Laseric trail container */}
      <div ref={trailContainerRef} className="absolute inset-0 overflow-hidden" />

      {/* Luminous Lime Center Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#d7ff45,0_0_24px_#d7ff45] opacity-0 transition-opacity duration-300"
      />

      {/* Laseric Shadow Ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/40 opacity-0 transition-[border-color,background-color,opacity] duration-300 will-change-transform shadow-[0_0_25px_rgba(215,255,69,0.35)]"
      />

      {/* Contextual Label Pill (Lime Tag) */}
      <span
        ref={labelRef}
        className="absolute left-0 top-0 flex h-7.5 items-center justify-center rounded-full bg-accent px-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink opacity-0 shadow-[0_4px_20px_rgba(215,255,69,0.4)] transition-opacity duration-200"
      />
    </div>
  );
};

export default CustomCursor;
