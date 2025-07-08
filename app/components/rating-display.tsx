
'use client';

import { Star, StarHalf } from "lucide-react";

export interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingDisplay({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  reviewCount,
  className = ''
}: RatingDisplayProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${sizeClasses[size]} fill-lovart-orange text-lovart-orange transition-colors duration-200`}
      />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${sizeClasses[size]} text-gray-300`} />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className={`${sizeClasses[size]} fill-lovart-orange text-lovart-orange transition-colors duration-200`} />
        </div>
      </div>
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-gray-300 transition-colors duration-200`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showNumber && (
        <div className="flex items-center gap-1">
          <span className={`font-semibold text-lovart-forest ${textSizes[size]}`}>
            {rating.toFixed(1)}
          </span>
          {reviewCount !== undefined && (
            <span className={`text-lovart-neutral ${textSizes[size]}`}>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Enhanced version with animation
export function AnimatedRatingDisplay({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  reviewCount,
  className = ''
}: RatingDisplayProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Full stars with staggered animation
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${sizeClasses[size]} fill-lovart-orange text-lovart-orange transition-all duration-300 hover:scale-110`}
        style={{ animationDelay: `${i * 100}ms` }}
      />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${sizeClasses[size]} text-gray-300`} />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star 
            className={`${sizeClasses[size]} fill-lovart-orange text-lovart-orange transition-all duration-300 hover:scale-110`}
            style={{ animationDelay: `${fullStars * 100}ms` }}
          />
        </div>
      </div>
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-gray-300 transition-all duration-300 hover:scale-110 hover:text-gray-400`}
        style={{ animationDelay: `${(fullStars + (hasHalfStar ? 1 : 0) + i) * 100}ms` }}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2 animate-fade-in-up ${className}`}>
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showNumber && (
        <div className="flex items-center gap-1">
          <span className={`font-semibold text-lovart-forest ${textSizes[size]} transition-colors duration-300`}>
            {rating.toFixed(1)}
          </span>
          {reviewCount !== undefined && (
            <span className={`text-lovart-neutral ${textSizes[size]} transition-colors duration-300`}>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Compact rating component for cards
export function CompactRating({ rating, reviewCount, className = '' }: { 
  rating: number; 
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Star className="h-3.5 w-3.5 fill-lovart-orange text-lovart-orange" />
      <span className="text-sm font-semibold text-lovart-forest">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-lovart-neutral">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
