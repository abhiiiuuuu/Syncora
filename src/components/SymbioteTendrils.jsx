import { useEffect, useRef } from 'react';

const SymbioteTendrils = ({ targetRef, active }) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const tendrils = useRef([]);
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!active) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      tendrils.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Tendril {
      constructor(anchorX, anchorY, angle, isBranch = false, parentSegment = null) {
        this.segments = [];
        this.length = isBranch ? 6 + Math.floor(Math.random() * 4) : 12 + Math.floor(Math.random() * 8);
        this.anchor = { x: anchorX, y: anchorY };
        this.angle = angle;
        this.isBranch = isBranch;
        this.parentSegment = parentSegment;

        for (let i = 0; i < this.length; i++) {
          this.segments.push({
            x: anchorX,
            y: anchorY,
            vx: 0,
            vy: 0
          });
        }

        this.branches = [];
        if (!isBranch && Math.random() > 0.4) {
          const attachIdx = Math.floor(this.length * 0.4);
          this.branches.push(new Tendril(anchorX, anchorY, angle + (Math.random() - 0.5), true, attachIdx));
        }
      }

      update(targetX, targetY, allSegments = null) {
        if (this.isBranch && this.parentSegment !== null && allSegments) {
          const parentSeg = allSegments[this.parentSegment];
          if (parentSeg) {
            this.anchor.x = parentSeg.x;
            this.anchor.y = parentSeg.y;
          }
        }

        this.segments[0].x = this.anchor.x;
        this.segments[0].y = this.anchor.y;

        for (let i = 1; i < this.segments.length; i++) {
          const seg = this.segments[i];
          const prev = this.segments[i - 1];
          const dx = prev.x - seg.x;
          const dy = prev.y - seg.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = this.isBranch ? 3 : 5;

          if (dist > targetDist) {
            const angle = Math.atan2(dy, dx);
            const tx = prev.x - Math.cos(angle) * targetDist;
            const ty = prev.y - Math.sin(angle) * targetDist;
            seg.vx += (tx - seg.x) * 0.2;
            seg.vy += (ty - seg.y) * 0.2;
          }

          if (i === this.segments.length - 1) {
            const mdx = targetX - seg.x;
            const mdy = targetY - seg.y;
            const pullStrength = this.isBranch ? 0.02 : 0.06;
            seg.vx += mdx * pullStrength;
            seg.vy += mdy * pullStrength;
          }

          seg.vx *= 0.75;
          seg.vy *= 0.75;
          seg.x += seg.vx;
          seg.y += seg.vy;

          const time = Date.now() * 0.004;
          seg.x += Math.sin(time + i * 0.3) * 0.4;
          seg.y += Math.cos(time + i * 0.3) * 0.4;
        }

        this.branches.forEach(branch => branch.update(targetX, targetY, this.segments));
      }

      draw(ctx) {
        if (this.segments.length < 2) return;

        const baseWidth = this.isBranch ? 3 : 6;
        for (let i = 1; i < this.segments.length; i++) {
          const p1 = this.segments[i - 1];
          const p2 = this.segments[i];
          const ratio = 1 - (i / this.segments.length);
          const currentWidth = Math.max(0.5, baseWidth * ratio);

          ctx.lineCap = 'round';
          ctx.strokeStyle = '#08080a';
          ctx.lineWidth = currentWidth;
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          ctx.strokeStyle = '#ccff00';
          ctx.lineWidth = Math.max(0.2, currentWidth * 0.25);
          ctx.globalAlpha = 0.25;
          ctx.beginPath();
          ctx.moveTo(p1.x - 0.5, p1.y - 0.5);
          ctx.lineTo(p2.x - 0.5, p2.y - 0.5);
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = Math.max(0.1, currentWidth * 0.15);
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.moveTo(p1.x + 0.5, p1.y - 0.5);
          ctx.lineTo(p2.x + 0.5, p2.y - 0.5);
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
        this.branches.forEach(branch => branch.draw(ctx));
      }
    }

    const initTendrils = () => {
      const rect = targetRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const newTendrils = [];
      const count = 5;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const ax = cx + Math.cos(angle) * (rect.width / 2);
        const ay = cy + Math.sin(angle) * (rect.height / 2);
        newTendrils.push(new Tendril(ax, ay, angle));
      }
      tendrils.current = newTendrils;
    };

    initTendrils();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tendrils.current.forEach((t) => {
        const angle = t.angle;
        t.anchor.x = cx + Math.cos(angle) * (rect.width / 2);
        t.anchor.y = cy + Math.sin(angle) * (rect.height / 2);
        t.update(mousePos.current.x, mousePos.current.y);
        t.draw(ctx);
      });
      rafId.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, targetRef]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default SymbioteTendrils;
