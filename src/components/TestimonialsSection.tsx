import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Plus, CheckCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/testimonials';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);

  // Form states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTag, setNewReviewTag] = useState('Verified Diner');
  const [successMsg, setSuccessMsg] = useState(false);

  // Load reviews from initial data + local storage
  useEffect(() => {
    const cached = localStorage.getItem('salman_reviews');
    if (cached) {
      try {
        setReviews(JSON.parse(cached));
      } catch (e) {
        setReviews(INITIAL_TESTIMONIALS);
      }
    } else {
      setReviews(INITIAL_TESTIMONIALS);
    }
  }, []);

  const handlePrevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      name: newReviewName,
      comment: newReviewComment,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      tag: newReviewTag
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('salman_reviews', JSON.stringify(updated));

    // Reset Form
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setNewReviewTag('Verified Diner');
    
    // Show Success, Hide form
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowAddReview(false);
      setActiveIndex(0); // Focus on the new review
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50 border-b border-gray-100">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-brand-yellow" />
            <span className="text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">TESTIMONIALS</span>
            <span className="w-8 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            What Our <span className="text-brand-red font-script text-5xl md:text-6xl font-normal">Customers</span> Say
          </h2>

          {/* Absolute floating write review trigger */}
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="mt-4 inline-flex items-center gap-2 text-2xs font-sans font-bold tracking-wider bg-white border border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red px-5 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {showAddReview ? 'CLOSE FORM' : 'WRITE A REVIEW'}
          </button>
        </div>

        {/* Interactive slide-down Write Review Form */}
        <AnimatePresence>
          {showAddReview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden max-w-lg mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 mb-12 text-left"
            >
              {!successMsg ? (
                <form onSubmit={handleAddReviewSubmit} className="space-y-4 font-sans text-xs">
                  <h3 className="text-base font-serif font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
                    Share Your Dining Experience
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-4xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Ahmad Raza"
                        className="w-full bg-gray-50 text-xs text-gray-800 px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow"
                      />
                    </div>
                    <div>
                      <label className="text-4xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-1">Your Patron Badge</label>
                      <select
                        value={newReviewTag}
                        onChange={(e) => setNewReviewTag(e.target.value)}
                        className="w-full bg-gray-50 text-xs text-gray-800 px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow appearance-none"
                      >
                        <option value="Verified Diner">Verified Diner</option>
                        <option value="Local Guide">Local Guide</option>
                        <option value="Regular Patron">Regular Patron</option>
                        <option value="First-time Visitor">First-time Visitor</option>
                      </select>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="text-4xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Dining Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              star <= newReviewRating 
                                ? 'text-brand-yellow fill-brand-yellow' 
                                : 'text-gray-200'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="text-4xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-1">Review Comments</label>
                    <textarea
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share what you ordered, spice level, how the service was..."
                      rows={3}
                      className="w-full bg-gray-50 text-xs text-gray-800 px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-darkRed text-white font-bold tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    POST TESTIMONIAL REVIEW
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3 font-sans">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-gray-800">Review Published!</h4>
                  <p className="text-3xs text-gray-400">Your testimonial was successfully added to the dining carousel.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Block */}
        {reviews.length > 0 && (
          <div className="max-w-2xl mx-auto relative px-8 sm:px-12">
            
            {/* Nav Arrows */}
            <button
              onClick={handlePrevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-100 hover:border-brand-red text-gray-400 hover:text-brand-red flex items-center justify-center shadow-sm cursor-pointer transition-colors z-10"
              title="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-100 hover:border-brand-red text-gray-400 hover:text-brand-red flex items-center justify-center shadow-sm cursor-pointer transition-colors z-10"
              title="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[activeIndex]?.id || 'testimonial'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100/50 text-left relative overflow-hidden"
              >
                
                {/* Decorative Quote */}
                <div className="absolute right-6 top-6 text-brand-red/5 select-none">
                  <Quote className="w-20 h-20 rotate-180" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-brand-yellow shrink-0">
                      <img
                        alt={reviews[activeIndex].name}
                        className="h-full w-full object-cover"
                        src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`}
                        onError={(e) => {
                          // Failover if Unsplash has issues
                          (e.target as HTMLImageElement).src = 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';
                        }}
                      />
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-bold text-gray-900 text-sm leading-none mb-1">{reviews[activeIndex].name}</h4>
                      <span className="text-3xs text-gray-400 font-medium">{reviews[activeIndex].tag || 'Verified Diner'}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-brand-yellow shrink-0">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < reviews[activeIndex].rating
                            ? 'text-brand-yellow fill-brand-yellow'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm italic leading-relaxed relative z-10 pl-1 border-l-2 border-brand-yellow/40">
                  "{reviews[activeIndex].comment}"
                </p>

                <div className="mt-4 text-right">
                  <span className="text-[10px] font-sans font-bold text-gray-400">DINED ON: {reviews[activeIndex].date}</span>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-brand-red' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
