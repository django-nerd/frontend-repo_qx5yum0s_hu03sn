import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FilePlus2, Save, Download, Trash2, Moon, Sun, User } from 'lucide-react';

export default function TopBar({ onNew, onSave, onExport, onClear, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="sticky top-0 z-20 w-full backdrop-blur-xl bg-black/30 text-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="flex items-center gap-3 select-none"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 border border-white/10 shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </motion.div>
            <div className="absolute inset-0 blur-lg bg-cyan-400/40 rounded-xl pointer-events-none" />
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-white/70">Glossy</div>
            <div className="text-lg font-semibold">Next-Gen Canvas</div>
          </div>
        </motion.div>

        {/* File Menu */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <MenuButton icon={FilePlus2} label="New" onClick={onNew} />
          <MenuButton icon={Save} label="Save" onClick={onSave} />
          <MenuButton icon={Download} label="Export" onClick={onExport} />
          <MenuButton icon={Trash2} label="Clear" onClick={onClear} />
        </div>

        {/* Right: Theme + User */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-indigo-200" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
            <span className="hidden sm:inline text-xs tracking-wide">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10" />
          </motion.button>

          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <User className="w-4 h-4 text-white/80" />
              <span className="hidden sm:inline text-xs">Guest</span>
            </button>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden backdrop-blur-xl bg-black/50 border border-white/10 shadow-xl"
              >
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/5">Profile</button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/5">Settings</button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/5">Sign in</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Icon className="w-4 h-4 text-white/80" />
      <span className="text-xs tracking-wide">{label}</span>
      <span className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10" />
    </motion.button>
  );
}
