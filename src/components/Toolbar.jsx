import { motion } from 'framer-motion';
import { Brush, Eraser, Layers, Pipette, Shapes, Undo2, Redo2 } from 'lucide-react';

const tools = [
  { id: 'brush', icon: Brush, label: 'Brush' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'color', icon: Pipette, label: 'Color Picker' },
  { id: 'shape', icon: Shapes, label: 'Shape Tool' },
  { id: 'undo', icon: Undo2, label: 'Undo' },
  { id: 'redo', icon: Redo2, label: 'Redo' },
];

export default function Toolbar({ active, setActive }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed left-4 top-24 z-20 flex flex-col gap-3 p-3 rounded-3xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl"
    >
      {tools.map((t) => (
        <ToolButton
          key={t.id}
          active={active === t.id}
          onClick={() => setActive(t.id)}
          icon={t.icon}
          label={t.label}
        />
      ))}
    </motion.div>
  );
}

function ToolButton({ icon: Icon, label, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group w-12 h-12 grid place-items-center rounded-2xl border transition-colors ${
        active
          ? 'border-cyan-400/60 bg-cyan-400/10 shadow-lg shadow-cyan-500/30'
          : 'border-white/10 bg-white/5 hover:bg-white/10'
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-cyan-300' : 'text-white/80'}`} />
      <span className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs px-2 py-1 rounded-lg bg-black/70 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
      {active && (
        <span className="absolute inset-0 rounded-2xl ring-2 ring-cyan-400/50 animate-pulse" />
      )}
    </motion.button>
  );
}
