import { Link, useNavigate } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSubmitClick = () => {
        if (!isSignedIn) {
            navigate('/sign-in');
        } else {
            navigate('/submit');
        }
    };

    return (
        <nav className="sticky top-0 z-50 px-4 py-4 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-7xl mx-auto glass rounded-2xl md:rounded-full px-6 py-3 pointer-events-auto flex justify-between items-center"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <img src="/logo-icon.png" alt="ProdSpark Logo" className="h-9 w-9 group-hover:rotate-12 transition-transform duration-300" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 -right-1 text-primary"
                        >
                            <Sparkles size={12} fill="currentColor" />
                        </motion.div>
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent tracking-tighter dark:from-white dark:via-white dark:to-primary">
                        ProdSpark
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/products" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center gap-1 group">
                        Browse
                        <span className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
                    </Link>
                    <button
                        onClick={handleSubmitClick}
                        className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors cursor-pointer"
                    >
                        Submit
                    </button>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

                    <ThemeToggle />

                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: 'w-9 h-9 border-2 border-primary/20 hover:border-primary transition-colors'
                                }
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link
                            to="/sign-in"
                            className="bg-secondary dark:bg-slate-100 dark:text-secondary text-white px-6 py-2 rounded-full text-sm font-black hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg shadow-slate-200 dark:shadow-none active:scale-95"
                        >
                            Sign In
                        </Link>
                    </SignedOut>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: 'w-9 h-9 border-2 border-primary/20 hover:border-primary transition-colors'
                                }
                            }}
                        />
                    </SignedIn>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-secondary dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl active:scale-90 transition-transform"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden mt-2 pointer-events-auto"
                    >
                        <div className="glass rounded-2xl p-4 space-y-3">
                            <Link
                                to="/products"
                                className="block text-lg font-bold text-secondary dark:text-white px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Browse Tools
                            </Link>
                            <button
                                onClick={() => { handleSubmitClick(); setIsMenuOpen(false); }}
                                className="w-full text-left block text-lg font-bold text-secondary dark:text-white px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                Submit Product
                            </button>
                            <SignedOut>
                                <Link
                                    to="/sign-in"
                                    className="block text-center bg-primary text-white px-4 py-4 rounded-xl font-black text-lg shadow-lg shadow-primary/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Join ProdSpark
                                </Link>
                            </SignedOut>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
