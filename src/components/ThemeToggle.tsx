import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors active:scale-95 overflow-hidden"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: 45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </AnimatePresence>

            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
    );
};
