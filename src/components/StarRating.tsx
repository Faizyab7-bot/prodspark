import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    max?: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
    interactive?: boolean;
}

export const StarRating = ({
    rating,
    max = 5,
    onRatingChange,
    size = 20,
    interactive = false,
}: StarRatingProps) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(max)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                    onClick={() => interactive && onRatingChange?.(i + 1)}
                />
            ))}
        </div>
    );
};
