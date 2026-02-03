import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Sparkles, Send } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-main pt-24 pb-12 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Branding */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-8 group">
                            <img src="/logo-icon.png" alt="Logo" className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="text-2xl font-black bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent dark:from-white dark:via-white dark:to-primary">
                                ProdSpark
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                            Empowering the next generation of creators with verified elite products and tools. Ignite your innovation today.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Twitter size={18} />, link: "#" },
                                { icon: <Github size={18} />, link: "#" },
                                { icon: <Linkedin size={18} />, link: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-main flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-black text-main uppercase tracking-widest text-xs mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Browse Catalog</Link></li>
                            <li><Link to="/submit" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Submit Product</Link></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Featured Sparks</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Quality Score Guide</a></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-black text-main uppercase tracking-widest text-xs mb-8">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Maker Dashboard</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Partner Program</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">API Access</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary font-bold transition-colors">Resources</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-black text-main uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                            Weekly Insight <Sparkles size={14} className="text-primary" />
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Join 12,000+ creators receiving the best tools in their inbox.</p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-main rounded-2xl px-5 focus-within:border-primary/40 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                                <Mail size={18} className="text-slate-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full py-4 px-3 outline-none bg-transparent font-medium text-sm"
                                />
                                <button className="text-primary hover:scale-110 transition-transform">
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-main flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">
                        © 2026 PRODSPARK ECOSYSTEM • ALL INTEL SECURED
                    </p>
                    <div className="flex gap-10">
                        <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Privacy Protocal</a>
                        <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Terms of Experience</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
