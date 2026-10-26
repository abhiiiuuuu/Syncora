import { Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';

const Scene = lazy(() => import('./Scene'));

const COMPACT_QUERY = '(max-width: 767px)';

const subscribeCompact = (onChange) => {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getCompact = () => window.matchMedia(COMPACT_QUERY).matches;

const subscribeVisibility = (onChange) => {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
};

const getVisibility = () => !document.hidden;

const supportsWebGL = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
};

/**
 * Fixed deep-field backdrop.
 *
 * The canvas is decorative only: it never receives pointer events, it pauses
 * while the tab is hidden, it falls back to a painted gradient without WebGL,
 * and it renders a single frame for reduced-motion visitors.
 */
export default function Background() {
  const shellRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [webgl] = useState(supportsWebGL);
  const compact = useSyncExternalStore(subscribeCompact, getCompact, () => false);
  const visible = useSyncExternalStore(subscribeVisibility, getVisibility, () => true);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    let frame = 0;
    const baseline = compact ? 0.72 : 1;
    const update = () => {
      frame = 0;
      const progress = window.scrollY / Math.max(window.innerHeight, 1);
      shell.style.opacity = String(Math.max(0.12, baseline * (1 - progress * 0.78)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [compact]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <div ref={shellRef} className="absolute inset-0">
        {webgl && !shouldReduceMotion ? (
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 32 }}
            dpr={[1, 1.6]}
            frameloop={visible ? 'always' : 'never'}
            gl={{
              antialias: !compact,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <Scene compact={compact} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="absolute inset-0">
            <div className="absolute right-[14%] top-1/2 h-[42vmin] w-[42vmin] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_34%_30%,#1b2624_0%,#0e1416_46%,#070a0b_72%)] shadow-[0_0_140px_rgba(215,255,69,0.16)]" />
            <div className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
            <div className="absolute left-1/2 top-1/2 h-[54vmax] w-[54vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.06]" />
          </div>
        )}
      </div>

      {/* Contrast scrim: solid behind the copy, open toward the planet. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#08090a_0%,rgba(8,9,10,0.94)_24%,rgba(8,9,10,0.62)_46%,rgba(8,9,10,0.18)_64%,transparent_78%)] lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#08090a_0%,rgba(8,9,10,0.88)_38%,rgba(8,9,10,0.34)_70%,transparent_100%)] lg:hidden" />

    </div>
  );
}
