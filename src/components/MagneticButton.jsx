
import React, { useState, useRef, useEffect } from 'react';
import SymbioteTendrils from './SymbioteTendrils';

const MagneticButton = ({ children, href, className = '', ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const rect = containerElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;

    const attractionRadius = 100;
    const attractionStrength = 0.3;
    if (Math.abs(dx) < attractionRadius && Math.abs(dy) < attractionRadius) {
      if (!isHovering) setIsHovering(true);

      const forceX = (dx / attractionRadius) * 20;
      const forceY = (dy / attractionRadius) * 20;

      const clampedX = Math.max(-20, Math.min(20, forceX));
      const clampedY = Math.max(-20, Math.min(20, forceY));

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setPosition({ x: clampedX, y: clampedY });
    } else if (isHovering) {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    const animateReturn = () => {
      setPosition((prev) => {
        const newX = prev.x * 0.85;
        const newY = prev.y * 0.85;

        if (Math.abs(newX) < 0.1 && Math.abs(newY) < 0.1) {
          return { x: 0, y: 0 };
        }

        animationFrameRef.current = requestAnimationFrame(animateReturn);
        return { x: newX, y: newY };
      });
    };

    animationFrameRef.current = requestAnimationFrame(animateReturn);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const transformStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovering ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (prefersReducedMotion || isTouchDevice) {
    const commonProps = {
      className: `${className} ${props.className || ''}`,
      ...props
    };
    return href ? <a href={href} {...commonProps}>{children}</a> : <button {...commonProps}>{children}</button>;
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={buttonRef}
        style={transformStyle}
        className="relative z-10"
      >
        {href ? (
          <a href={href} className={`${className} ${props.className || ''} inline-block`} {...props}>
            {children}
          </a>
        ) : (
          <button className={`${className} ${props.className || ''} inline-block`} {...props}>
            {children}
          </button>
        )}
        <SymbioteTendrils targetRef={buttonRef} active={isHovering} />
      </div>
    </div>
  );
};

export default MagneticButton;
