import { motion } from 'framer-motion';

export default function ControlBar({ size, setSize, opacity, setOpacity, color, setColor }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] md:w-[70%] rounded-3xl border border-white/10 backdrop-blur-xl bg-black/30 p-4 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-4">
          <label className="text-xs text-white/70 w-16">Size</label>
          <input
            type="range"
            min="1"
            max="60"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="w-6 h-6 rounded-full" style={{ background: color, boxShadow: `0 0 18px ${color}` }} />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-xs text-white/70 w-16">Opacity</label>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-fuchsia-400"
          />
          <div className="text-xs text-white/70 w-10 text-right">{Math.round(opacity * 100)}%</div>
        </div>

        <div className="flex items-center gap-4 md:col-span-2">
          <label className="text-xs text-white/70 w-16">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-10 rounded-xl bg-transparent border border-white/10 overflow-hidden cursor-pointer"
          />

          <div className="flex items-center gap-2">
            {['#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#34d399', '#60a5fa'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full border border-white/10 hover:scale-105 transition-transform"
                style={{ background: c, boxShadow: `0 0 18px ${c}66` }}
                aria-label={`Set color ${c}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
