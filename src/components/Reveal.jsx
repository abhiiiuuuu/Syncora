import { useEffect, useRef, useState } from 'react';

/**
 * Reveals children once they enter the viewport. Content stays visible when
 * motion is reduced or IntersectionObserver is unavailable.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reduceMotion || typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
