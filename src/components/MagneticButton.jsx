import { useEffect, useRef, useState } from 'react';
import SymbioteTendrils from './SymbioteTendrils';

/**
 * A restrained magnetic CTA with the original tendril hover effect. It only
 * moves on devices with a fine pointer and no reduced-motion preference, and
 * falls back to a plain link/button.
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
  const [isHovering, setIsHovering] = useState(false);

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

  const handlePointerEnter = () => {
    if (enabled) setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    const inner = innerRef.current;
    if (inner) inner.style.transform = '';
  };

  const handlePointerMove = (event) => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const rect = wrapper.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <span
        ref={innerRef}
        className="inline-flex max-w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
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
        <SymbioteTendrils targetRef={innerRef} active={isHovering && enabled} />
      </span>
    </span>
  );
}
