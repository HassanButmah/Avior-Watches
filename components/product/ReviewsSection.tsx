'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { WatchReview } from '@/lib/watches';

interface ReviewsSectionProps {
  reviews: WatchReview[];
  rating: number;
  totalReviews: number;
}

export default function ReviewsSection({ reviews, rating, totalReviews }: ReviewsSectionProps) {
  return (
    <section className="py-16 md:py-20 border-t border-white/10 bg-white/[0.02]" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 id="reviews-heading" className="font-display text-3xl md:text-4xl text-white mb-3">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(rating) ? 'text-gold fill-gold' : 'text-white/20'}
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm">
                {rating} out of 5 · {totalReviews} reviews
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-surface luxury-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white text-sm font-medium">{review.author}</p>
                  <p className="text-white/40 text-xs">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < review.rating ? 'text-gold fill-gold' : 'text-white/20'}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-white text-sm font-medium mb-2">{review.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{review.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
