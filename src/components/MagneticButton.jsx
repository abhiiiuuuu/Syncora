import { useEffect, useRef, useState } from 'react';

/**
 * A restrained magnetic CTA that moves smoothly toward the cursor on hover
 * for devices with a fine pointer and no reduced-motion preference.
 */
export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 12,
  ...props
}) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const frameRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setEnabled(finePointer.matches && !reduceMotion.matches);
    sync();

    finePointer.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);

    return () => {
      finePointer.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerLeave = () => {
    const inner = innerRef.current;
    if (inner) {
      inner.style.transition = 'transform 0.4s ease-out'; // Smooth return transition
      inner.style.transform = '';
      // Remove transition after it completes to avoid interfering with subsequent moves
      const transitionEndHandler = () => {
        inner.style.transition = '';
        inner.removeEventListener('transitionend', transitionEndHandler);
      };
      inner.addEventListener('transitionend', transitionEndHandler);
    }
  };

  const handlePointerMove = (event) => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const rect = wrapper.getBoundingClientRect();
    // Center the transformation origin
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      // Apply transformation with spring-like easing
      inner.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'; // Spring-like easing
      inner.style.transform = `translate3d(${x * strength * 2}px, ${y * strength}px, 0)`;
    });
  };

  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
  const linkProps = href
    ? {
        href,
        ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        ...props,
      }
    : props;

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex max-w-full align-middle"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <span
        ref={innerRef}
        className="inline-flex max-w-full will-change-transform"
      >
        {href ? (
          <a className={className} {...linkProps}>
            {children}
          </a>
        ) : (
          <button className={className} {...props}>
            {children}
          </button>
        )}
      </span>
    </span>
  );
}
