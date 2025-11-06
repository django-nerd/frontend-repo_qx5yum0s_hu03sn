import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

// Minimal glossy canvas with particle shimmer and basic drawing
export default function CanvasArea({ activeTool, size, opacity, color }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [fps, setFps] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastTime = useRef(performance.now());

  // Setup 2D canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    resize();
    window.addEventListener('resize', resize);
    ctxRef.current = ctx;
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Simple FPS counter
  useEffect(() => {
    let frame = 0;
    let lastFpsUpdate = performance.now();
    const loop = () => {
      const now = performance.now();
      frame += 1;
      if (now - lastFpsUpdate >= 1000) {
        setFps(frame);
        frame = 0;
        lastFpsUpdate = now;
      }
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // Draw with glow/opacity
  const start = (e) => {
    if (activeTool === 'eraser') return setIsDrawing(true);
    setIsDrawing(true);
    const ctx = ctxRef.current;
    ctx.beginPath();
    const { x, y } = getPos(e);
    ctx.moveTo(x, y);
  };
  const move = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    const { x, y } = getPos(e);
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = size * 1.6;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineTo(x, y);
      ctx.stroke();
      return;
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.shadowBlur = size * 0.8;
    ctx.shadowColor = color + 'AA';
    ctx.globalAlpha = opacity;
    ctx.lineTo(x, y);
    ctx.stroke();

    // shimmer particles
    const pctx = ctx;
    pctx.save();
    pctx.globalAlpha = 0.6 * opacity;
    pctx.fillStyle = color;
    for (let i = 0; i < 2; i++) {
      const dx = x + (Math.random() - 0.5) * size * 0.8;
      const dy = y + (Math.random() - 0.5) * size * 0.8;
      pctx.beginPath();
      pctx.arc(dx, dy, Math.random() * (size * 0.15), 0, Math.PI * 2);
      pctx.fill();
    }
    pctx.restore();
  };
  const end = () => setIsDrawing(false);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const isTouch = e.touches?.length;
    const px = isTouch ? e.touches[0].clientX : e.clientX;
    const py = isTouch ? e.touches[0].clientY : e.clientY;
    return { x: px - rect.left, y: py - rect.top };
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[74vh] rounded-[30px] overflow-hidden">
      {/* Spline hero background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlays (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute -inset-10 blur-3xl opacity-60" style={{ background: 'radial-gradient(600px circle at 20% 20%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(600px circle at 80% 30%, rgba(217,70,239,0.18), transparent 60%)' }} />

      {/* Glassy canvas surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute inset-4 rounded-3xl border border-white/10 backdrop-blur-xl bg-black/25 shadow-[0_0_60px_rgba(56,189,248,0.25)]"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
          className="w-full h-full rounded-3xl cursor-crosshair"
        />

        {/* HUD */}
        <div className="absolute top-3 right-5 text-xs text-white/80 px-3 py-1 rounded-full bg-black/40 border border-white/10">
          {fps} FPS
        </div>
      </motion.div>
    </div>
  );
}
