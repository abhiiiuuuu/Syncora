import { motion, useReducedMotion } from 'framer-motion';

/**
 * Framer Motion enhanced Reveal component for staggered, spring-based scroll entrances.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  yOffset = 32,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  if (shouldReduceMotion) {
    const FallbackTag = Tag;
    return (
      <FallbackTag className={className} {...props}>
        {children}
      </FallbackTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
