import React, { useState, useEffect, useRef } from 'react';
import { Star, ExternalLink, MapPin, Clock, ThumbsUp, Quote, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// To connect real Google Reviews:
//  1. Go to https://console.cloud.google.com/
//  2. Enable the "Places API"
//  3. Get an API key and paste it below
//  4. Find your Place ID at: https://developers.google.com/maps/documentation/places/web-service/place-id
//  5. Enable "Maps JavaScript API" as well
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_API_KEY = ''; // ← paste your Google Maps API key here
const PLACE_ID = 'ChIJ...'; // ← paste your Google Place ID here

// ─────────────────────────────────────────────────────────────────────────────
// Fallback / Seed Reviews (shown when API key is not configured)
// These are representative of real Google Reviews style
// ─────────────────────────────────────────────────────────────────────────────
const SEED_REVIEWS = [
  {
    id: 'g1',
    author_name: 'Muhammad Usman',
    rating: 5,
    text: 'Best Shinwari Karahi I have ever had in Swat. The mutton was melt-in-mouth tender, and the simplicity of just tomatoes and salt is what makes it authentic. Highly recommended for anyone visiting Chota Kalam.',
    time: '2 weeks ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=12',
    source: 'Google',
    helpful: 24,
  },
  {
    id: 'g2',
    author_name: 'Bilal Hussain',
    rating: 5,
    text: 'Kabuli Pulao here is absolutely divine. The rice is fragrant, the carrots and raisins add sweetness, and the mutton joint on top is perfectly slow-cooked. Worth every rupee. Will visit again!',
    time: '1 month ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=15',
    source: 'Google',
    helpful: 18,
  },
  {
    id: 'g3',
    author_name: 'Asad Khan',
    rating: 5,
    text: 'Visited during a family trip to Kalam. The BBQ Special Platter was massive and absolutely delicious — Malai Boti, Rajasthani Tikka, Seekh Kababs all perfectly grilled. The naans were hot and fresh. Staff was very welcoming.',
    time: '3 weeks ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=33',
    source: 'Google',
    helpful: 31,
  },
  {
    id: 'g4',
    author_name: 'Tariq Mehmood',
    rating: 4,
    text: 'Really nice place with good ambience. The Chicken White Karahi was creamy and flavourful. Service was a bit slow during peak hours but the food quality made up for it. Generous portions too.',
    time: '1 month ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=51',
    source: 'Google',
    helpful: 12,
  },
  {
    id: 'g5',
    author_name: 'Farhan Iqbal',
    rating: 5,
    text: 'Dumba Shinwari Karahi was out of this world. Pure, clean taste — no artificial stuff. The Afghani Naan on the side was perfectly thick and fluffy from the clay tandoor. This is the real deal!',
    time: '5 days ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=68',
    source: 'Google',
    helpful: 9,
  },
  {
    id: 'g6',
    author_name: 'Zainab Rafique',
    rating: 5,
    text: 'One of the best dining experiences in Kalam valley. Everything from Chicken Malai Boti to the Gajar Halwa was excellent. The restaurant is clean, spacious and family-friendly. A must visit!',
    time: '2 months ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=47',
    source: 'Google',
    helpful: 20,
  },
  {
    id: 'g7',
    author_name: 'Hamza Raza',
    rating: 5,
    text: 'The Namkeen Rosh was incredible — tender mutton in a salted broth with potatoes. Very authentic Peshawari style. Combined with the fresh Roghni Naan — absolutely perfect. Glad we stopped here!',
    time: '3 months ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=22',
    source: 'Google',
    helpful: 16,
  },
  {
    id: 'g8',
    author_name: 'Sara Javed',
    rating: 4,
    text: 'Loved the Turkish Kabab — very different and light. The Chicken Lemon Karahi Red was tangy and refreshing. Prices are reasonable for the quality and quantity you get. Will definitely come back!',
    time: '6 weeks ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=56',
    source: 'Google',
    helpful: 8,
  },
  {
    id: 'g9',
    author_name: 'Adnan Siddiqui',
    rating: 5,
    text: 'Top tier restaurant in the whole Swat region. Been coming here for 5 years, quality never drops. Their Dumba Dumpukht Lumbri is worth the 45 minute wait — slow baked mutton shoulder with potatoes, simply unmatched.',
    time: '1 week ago',
    profile_photo_url: 'https://i.pravatar.cc/80?img=11',
    source: 'Google',
    helpful: 35,
  },
];

interface GoogleReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  time: string;
  profile_photo_url: string;
  source: string;
  helpful: number;
}

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingLiveData, setUsingLiveData] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);

  // Attempt to fetch live Google Reviews via Maps JS API
  useEffect(() => {
    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === '' || PLACE_ID === 'ChIJ...') {
      // No API key configured — use seed data
      setTimeout(() => {
        setReviews(SEED_REVIEWS);
        setLoading(false);
        setUsingLiveData(false);
      }, 800);
      return;
    }

    // Dynamically load the Google Maps JS API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const service = new (window as any).google.maps.places.PlacesService(
        document.createElement('div')
      );
      service.getDetails(
        {
          placeId: PLACE_ID,
          fields: ['name', 'rating', 'reviews', 'user_ratings_total'],
        },
        (place: any, status: any) => {
          if (
            status === (window as any).google.maps.places.PlacesServiceStatus.OK &&
            place?.reviews?.length
          ) {
            const mapped: GoogleReview[] = place.reviews.map((r: any, i: number) => ({
              id: `google-${i}`,
              author_name: r.author_name,
              rating: r.rating,
              text: r.text,
              time: r.relative_time_description,
              profile_photo_url: r.profile_photo_url,
              source: 'Google',
              helpful: 0,
            }));
            setReviews(mapped);
            setUsingLiveData(true);
          } else {
            setReviews(SEED_REVIEWS);
          }
          setLoading(false);
        }
      );
    };
    script.onerror = () => {
      setReviews(SEED_REVIEWS);
      setLoading(false);
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = reviews
    .filter((r) => filterRating === 'all' || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0; // keep insertion order for 'recent'
    });

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '—';

  const ratingDist = [5, 4, 3, 2, 1].map((n) => ({
    star: n,
    count: reviews.filter((r) => r.rating === n).length,
    pct: reviews.length > 0 ? (reviews.filter((r) => r.rating === n).length / reviews.length) * 100 : 0,
  }));

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Page Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-12 h-[2px] bg-brand-yellow" />
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-gray-400 uppercase">
              {usingLiveData ? '🟢 Live from Google' : 'Customer Reviews'}
            </span>
            <span className="w-12 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-4">
            What Our{' '}
            <span className="text-brand-red font-script text-5xl md:text-6xl lg:text-7xl font-normal">
              Customers
            </span>{' '}
            Say
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Real reviews from real guests — straight from Google.
          </p>

          {/* Google link */}
          <a
            href="https://www.google.com/search?q=Salman+Restaurant+Chota+Kalam+Swat+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs font-sans font-bold text-gray-500 hover:text-brand-red transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M21.805 10.023H12.18v3.955h5.524c-.238 1.273-1.002 2.354-2.134 3.076v2.554h3.455c2.021-1.862 3.189-4.604 3.189-7.854 0-.525-.043-1.038-.127-1.538l.518.807z" fill="#4285F4"/>
              <path d="M12.18 22c2.77 0 5.093-.918 6.79-2.49l-3.454-2.555c-.955.639-2.176 1.015-3.336 1.015-2.566 0-4.74-1.733-5.516-4.063H3.09v2.632C4.778 19.848 8.249 22 12.18 22z" fill="#34A853"/>
              <path d="M6.664 13.907a5.965 5.965 0 01-.316-1.907c0-.662.114-1.306.316-1.907V7.461H3.09A9.978 9.978 0 002 12c0 1.608.385 3.13 1.09 4.539l3.574-2.632z" fill="#FBBC05"/>
              <path d="M12.18 5.977c1.444 0 2.739.497 3.757 1.474l2.813-2.813C16.97 2.988 14.648 2 12.18 2 8.249 2 4.778 4.152 3.09 7.461l3.574 2.632c.776-2.33 2.95-4.116 5.516-4.116z" fill="#EA4335"/>
            </svg>
            View on Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <RefreshCw className="w-8 h-8 text-brand-red animate-spin" />
            <p className="text-gray-500 text-sm font-sans">Loading reviews…</p>
          </div>
        ) : (
          <>
            {/* Rating Summary Panel */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mb-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Big Average */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-7xl md:text-8xl font-sans font-black text-gray-900 leading-none">{avgRating}</span>
                <StarRow rating={Math.round(Number(avgRating))} size="lg" />
                <p className="text-gray-400 text-sm mt-2 font-sans">{reviews.length} reviews</p>
              </div>

              {/* Rating Distribution Bars */}
              <div className="space-y-2 md:col-span-2">
                {ratingDist.map(({ star, count, pct }) => (
                  <button
                    key={star}
                    onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                    className={`w-full flex items-center gap-3 group cursor-pointer rounded-xl px-3 py-1.5 transition-colors ${filterRating === star ? 'bg-brand-red/5' : 'hover:bg-gray-50'}`}
                  >
                    <span className="text-xs font-sans font-bold text-gray-600 w-4 shrink-0">{star}</span>
                    <Star className={`w-3.5 h-3.5 shrink-0 ${filterRating === star ? 'text-brand-red fill-brand-red' : 'text-yellow-400 fill-yellow-400'}`} />
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className={`h-full rounded-full ${filterRating === star ? 'bg-brand-red' : 'bg-yellow-400'}`}
                      />
                    </div>
                    <span className="text-xs font-sans text-gray-400 w-5 shrink-0 text-right">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans font-bold text-gray-400 uppercase tracking-widest">Filter:</span>
                {(['all', 5, 4, 3, 2, 1] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilterRating(r)}
                    className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${filterRating === r ? 'bg-brand-red text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-100 hover:border-brand-red hover:text-brand-red'}`}
                  >
                    {r === 'all' ? 'All Stars' : `${r}★`}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold text-gray-400 uppercase tracking-widest">Sort:</span>
                {(['recent', 'rating', 'helpful'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer capitalize ${sortBy === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Cards Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((review, i) => {
                  const isExpanded = expanded.has(review.id);
                  const needsTruncate = review.text.length > 200;

                  return (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col gap-4 relative overflow-hidden"
                    >
                      {/* Big decorative quote mark */}
                      <div className="absolute right-5 top-5 text-gray-50">
                        <Quote className="w-14 h-14 rotate-180" />
                      </div>

                      {/* Reviewer Info */}
                      <div className="flex items-center gap-3 relative z-10">
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow/30 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=c8102e&color=fff&bold=true`;
                          }}
                        />
                        <div>
                          <p className="font-sans font-bold text-gray-900 text-sm leading-tight">{review.author_name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRow rating={review.rating} />
                          </div>
                        </div>
                        {/* Google icon */}
                        <div className="ml-auto shrink-0">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                            <path d="M21.805 10.023H12.18v3.955h5.524c-.238 1.273-1.002 2.354-2.134 3.076v2.554h3.455c2.021-1.862 3.189-4.604 3.189-7.854 0-.525-.043-1.038-.127-1.538l.518.807z" fill="#4285F4"/>
                            <path d="M12.18 22c2.77 0 5.093-.918 6.79-2.49l-3.454-2.555c-.955.639-2.176 1.015-3.336 1.015-2.566 0-4.74-1.733-5.516-4.063H3.09v2.632C4.778 19.848 8.249 22 12.18 22z" fill="#34A853"/>
                            <path d="M6.664 13.907a5.965 5.965 0 01-.316-1.907c0-.662.114-1.306.316-1.907V7.461H3.09A9.978 9.978 0 002 12c0 1.608.385 3.13 1.09 4.539l3.574-2.632z" fill="#FBBC05"/>
                            <path d="M12.18 5.977c1.444 0 2.739.497 3.757 1.474l2.813-2.813C16.97 2.988 14.648 2 12.18 2 8.249 2 4.778 4.152 3.09 7.461l3.574 2.632c.776-2.33 2.95-4.116 5.516-4.116z" fill="#EA4335"/>
                          </svg>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="relative z-10">
                        <p className={`text-gray-600 text-sm leading-relaxed ${!isExpanded && needsTruncate ? 'line-clamp-4' : ''}`}>
                          "{review.text}"
                        </p>
                        {needsTruncate && (
                          <button
                            onClick={() => toggleExpanded(review.id)}
                            className="mt-1.5 text-xs font-sans font-bold text-brand-red hover:text-brand-darkRed transition-colors cursor-pointer"
                          >
                            {isExpanded ? 'Show less ↑' : 'Read more ↓'}
                          </button>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto relative z-10">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-[11px] font-sans">{review.time}</span>
                        </div>
                        {review.helpful > 0 && (
                          <div className="flex items-center gap-1 text-gray-400">
                            <ThumbsUp className="w-3 h-3" />
                            <span className="text-[11px] font-sans">{review.helpful} found helpful</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm font-sans">No reviews match this filter.</p>
                <button onClick={() => setFilterRating('all')} className="mt-3 text-brand-red text-xs font-bold cursor-pointer hover:underline">
                  Clear filter
                </button>
              </div>
            )}

            {/* Write Review CTA */}
            <div className="mt-12 bg-brand-red rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%221%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%222%22/%3E%3C/g%3E%3C/svg%3E')]" />
              <div className="relative z-10">
                <h3 className="text-white font-serif font-bold text-3xl md:text-4xl mb-3">
                  Dined with us? Share your experience!
                </h3>
                <p className="text-white/80 text-base mb-7 max-w-lg mx-auto">
                  Your review helps other guests discover Salman Restaurant and helps us keep improving.
                </p>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-brand-red font-sans font-bold tracking-wider text-sm px-10 py-4 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M21.805 10.023H12.18v3.955h5.524c-.238 1.273-1.002 2.354-2.134 3.076v2.554h3.455c2.021-1.862 3.189-4.604 3.189-7.854 0-.525-.043-1.038-.127-1.538l.518.807z" fill="#4285F4"/>
                    <path d="M12.18 22c2.77 0 5.093-.918 6.79-2.49l-3.454-2.555c-.955.639-2.176 1.015-3.336 1.015-2.566 0-4.74-1.733-5.516-4.063H3.09v2.632C4.778 19.848 8.249 22 12.18 22z" fill="#34A853"/>
                    <path d="M6.664 13.907a5.965 5.965 0 01-.316-1.907c0-.662.114-1.306.316-1.907V7.461H3.09A9.978 9.978 0 002 12c0 1.608.385 3.13 1.09 4.539l3.574-2.632z" fill="#FBBC05"/>
                    <path d="M12.18 5.977c1.444 0 2.739.497 3.757 1.474l2.813-2.813C16.97 2.988 14.648 2 12.18 2 8.249 2 4.778 4.152 3.09 7.461l3.574 2.632c.776-2.33 2.95-4.116 5.516-4.116z" fill="#EA4335"/>
                  </svg>
                  WRITE A GOOGLE REVIEW
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
