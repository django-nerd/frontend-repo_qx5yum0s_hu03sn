import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from './components/TopBar';
import Toolbar from './components/Toolbar';
import ControlBar from './components/ControlBar';
import CanvasArea from './components/CanvasArea';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTool, setActiveTool] = useState('brush');
  const [size, setSize] = useState(18);
  const [opacity, setOpacity] = useState(0.9);
  const [color, setColor] = useState('#22d3ee');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleNew = () => window.location.reload();
  const handleSave = () => {
    const node = document.querySelector('canvas');
    const data = node.toDataURL('image/png');
    localStorage.setItem('glossy-canvas', data);
    // reward animation pulse
    flash();
  };
  const handleExport = () => {
    const node = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'glossy-art.png';
    link.href = node.toDataURL('image/png');
    link.click();
  };
  const handleClear = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flash();
  };

  const flash = () => {
    const el = document.getElementById('reward');
    if (!el) return;
    el.animate(
      [
        { opacity: 0, transform: 'scale(0.9)' },
        { opacity: 1, transform: 'scale(1.02)' },
        { opacity: 0, transform: 'scale(1)' },
      ],
      { duration: 800, easing: 'cubic-bezier(0.22,1,0.36,1)' }
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500/30 selection:text-white">
      <TopBar
        onNew={handleNew}
        onSave={handleSave}
        onExport={handleExport}
        onClear={handleClear}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-28">
        <section className="mb-6">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="text-2xl md:text-3xl font-semibold text-white/90"
          >
            Paint with light. Create with flow.
          </motion.h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            A glossy, glassmorphic canvas with neon glow brushes, silky motion, and immersive vibes.
          </p>
        </section>

        <CanvasArea activeTool={activeTool} size={size} opacity={opacity} color={color} />
      </main>

      <Toolbar active={activeTool} setActive={setActiveTool} />
      <ControlBar size={size} setSize={setSize} opacity={opacity} setOpacity={setOpacity} color={color} setColor={setColor} />

      {/* reward burst */}
      <div id="reward" className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-3xl" />
      </div>

      {/* ambient radial glow */}
      <div className="pointer-events-none fixed -inset-32 blur-3xl opacity-50" style={{ background: 'radial-gradient(800px circle at 20% 10%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(800px circle at 80% 30%, rgba(217,70,239,0.10), transparent 60%)' }} />
    </div>
  );
}

export default App;
