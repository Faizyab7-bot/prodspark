import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
    return (
        <>
            <SEO
                title="404 - Page Not Found | ProdSpark"
                description="The page you're looking for doesn't exist. Return to ProdSpark to discover amazing tools and products."
            />
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-950 dark:via-orange-950/10 dark:to-slate-950">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Animated 404 */}
                    <div className="relative mb-12">
                        <h1 className="text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 select-none leading-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="text-primary animate-pulse" size={80} />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-secondary dark:text-white">
                            Oops! Lost in Space
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto font-medium">
                            The page you're looking for doesn't exist. It might have been moved, deleted, or perhaps it never existed at all.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/"
                            className="group flex items-center gap-3 px-8 py-4 bg-primary hover:bg-orange-600 text-white rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                        >
                            <Home size={20} />
                            Back to Home
                            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                        </Link>

                        <Link
                            to="/products"
                            className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border-2 border-main hover:border-primary/40 text-secondary dark:text-white rounded-2xl font-bold transition-all hover:scale-105"
                        >
                            <ArrowLeft size={20} />
                            Browse Products
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-20 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-40">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-2 bg-gradient-to-r from-primary/20 to-orange-300/20 rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
