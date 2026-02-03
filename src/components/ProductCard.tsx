import { Link } from 'react-router-dom';
import { Eye, Heart, Zap, Tag } from 'lucide-react';
import type { Product } from '../types';
import { StarRating } from './StarRating';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
    averageRating: number;
}

export const ProductCard = ({ product, averageRating }: ProductCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group premium-card flex flex-col h-full overflow-hidden"
        >
            <Link to={`/products/${product.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                    src={`${product.logo_url}?q_auto,f_auto,w_600`}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20 ${product.pricing === 'Free' ? 'bg-green-500/90 text-white' :
                        product.pricing === 'Premium' ? 'bg-orange-500/90 text-white' :
                            'bg-indigo-600/90 text-white'
                        }`}>
                        {product.pricing}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <Tag size={10} />
                        {product.category}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-extrabold text-xl leading-tight line-clamp-1 tracking-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-700 dark:text-yellow-500 font-black text-[11px] border border-yellow-100 dark:border-yellow-500/20">
                        <StarRating rating={Math.round(averageRating)} size={12} />
                        <span>{averageRating.toFixed(1)}</span>
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto pt-6 border-t border-main flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold">
                            <Eye size={14} className="stroke-[2.5]" />
                            {product.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold">
                            <Heart size={14} className={`stroke-[2.5] ${product.likes.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                            {product.likes.length}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-black text-primary bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-100 dark:border-orange-500/20 shadow-sm">
                        <Zap size={12} fill="currentColor" />
                        SCORE: {Math.round(product.quality_score || 0)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
