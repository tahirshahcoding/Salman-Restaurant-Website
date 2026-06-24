import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Plus, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuSectionProps {
  onAddItemToCart: (menuItem: MenuItem, quantity: number, notes?: string) => void;
  onOpenCart: () => void;
}

type MenuCategory = 'all' | 'bbq' | 'pakistani' | 'shinwari' | 'afghani' | 'drinks' | 'refreshments' | 'naan' | 'readymade';
type PortionSize = 'full' | 'half';

// ──────────────────────────────────────────────────────────────────────────────
// Portion Toggle — a small pill switcher used both on cards and in the modal
// ──────────────────────────────────────────────────────────────────────────────
function PortionToggle({
  portion,
  onToggle,
  fullPrice,
  halfPrice,
}: {
  portion: PortionSize;
  onToggle: (p: PortionSize) => void;
  fullPrice: number;
  halfPrice: number;
}) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5 gap-0.5 text-[10px] font-sans font-bold tracking-wide select-none">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle('full'); }}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${portion === 'full'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        FULL
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle('half'); }}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${portion === 'half'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        HALF
      </button>
    </div>
  );
}

export default function MenuSection({ onAddItemToCart, onOpenCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [dishQuantity, setDishQuantity] = useState(1);
  const [dishNotes, setDishNotes] = useState('');

  // Per-card portion state: maps item.id -> 'full' | 'half'
  const [cardPortions, setCardPortions] = useState<Record<string, PortionSize>>({});
  // Modal portion state
  const [modalPortion, setModalPortion] = useState<PortionSize>('full');

  const categoriesList: { value: MenuCategory; label: string }[] = [
    { value: 'all', label: 'FULL MENU' },
    { value: 'bbq', label: 'BBQ' },
    { value: 'pakistani', label: 'PAKISTANI' },
    { value: 'shinwari', label: 'SHINWARI & DUMBA' },
    { value: 'afghani', label: 'AFGHANI' },
    { value: 'drinks', label: 'BEVERAGES' },
    { value: 'refreshments', label: 'REFRESHMENTS' },
    { value: 'naan', label: 'BREAD & NAAN' },
    { value: 'readymade', label: 'READY MADE' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (onlyVegetarian && !item.isVegetarian) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyVegetarian]);

  // Helper: get the effective price for a card given portion selection
  const getEffectivePrice = (dish: MenuItem, portion: PortionSize) => {
    if (portion === 'half' && dish.halfPrice != null) return dish.halfPrice;
    return dish.price;
  };

  // Helper: get effective description
  const getEffectiveDescription = (dish: MenuItem, portion: PortionSize) => {
    if (portion === 'half' && dish.halfDescription) return dish.halfDescription;
    return dish.description;
  };

  const getCardPortion = (id: string): PortionSize => cardPortions[id] ?? 'full';

  const setCardPortion = (id: string, p: PortionSize) =>
    setCardPortions((prev) => ({ ...prev, [id]: p }));

  const handleOpenDishDetails = (dish: MenuItem, portion: PortionSize) => {
    setSelectedDish(dish);
    setModalPortion(portion);
    setDishQuantity(1);
    setDishNotes('');
  };

  const handleAddFromModal = () => {
    if (selectedDish) {
      // Create a synthetic MenuItem with the effective price / description so the cart
      // shows the right values regardless of the portion selected.
      const effectiveItem: MenuItem = {
        ...selectedDish,
        id: modalPortion === 'half' && selectedDish.halfPrice != null
          ? `${selectedDish.id}-half`
          : `${selectedDish.id}-full`,
        name: selectedDish.name + (selectedDish.halfPrice != null ? ` (${modalPortion === 'half' ? 'Half' : 'Full'})` : ''),
        price: getEffectivePrice(selectedDish, modalPortion),
        description: getEffectiveDescription(selectedDish, modalPortion),
      };
      onAddItemToCart(effectiveItem, dishQuantity, dishNotes);
      setSelectedDish(null);
    }
  };

  const handleQuickAdd = (dish: MenuItem, portion: PortionSize) => {
    const effectiveItem: MenuItem = {
      ...dish,
      id: portion === 'half' && dish.halfPrice != null ? `${dish.id}-half` : `${dish.id}-full`,
      name: dish.name + (dish.halfPrice != null ? ` (${portion === 'half' ? 'Half' : 'Full'})` : ''),
      price: getEffectivePrice(dish, portion),
      description: getEffectiveDescription(dish, portion),
    };
    onAddItemToCart(effectiveItem, 1);
  };

  return (
    <section id="menu" className="py-12 bg-gray-50 border-t border-b border-gray-100">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                SALMAN RESTAURANT
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Freshly Cooked <span className="text-brand-red font-script text-5xl md:text-6xl font-normal block sm:inline">Delicacies</span>
            </h2>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish names or recipes..."
                className="w-full bg-white text-xs text-gray-800 pl-10 pr-4 py-3 rounded-full border border-gray-100 shadow-sm focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Vegetarian toggle */}
            <label className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 cursor-pointer select-none text-xs font-sans font-semibold text-gray-600 hover:text-brand-red transition-colors">
              <input
                type="checkbox"
                checked={onlyVegetarian}
                onChange={(e) => setOnlyVegetarian(e.target.checked)}
                className="rounded border-gray-300 text-brand-red focus:ring-brand-red w-4 h-4 cursor-pointer"
              />
              🌿 VEG ONLY
            </label>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 -mx-4 px-4 scrollbar-thin scrollbar-thumb-brand-yellow scrollbar-track-transparent">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full font-sans font-bold text-2xs tracking-widest uppercase transition-all shrink-0 cursor-pointer ${selectedCategory === cat.value
                  ? 'bg-brand-red text-white shadow-md shadow-red-500/10'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100 shadow-sm'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredItems.map((dish) => {
              const portion = getCardPortion(dish.id);
              const activePrice = getEffectivePrice(dish, portion);
              const hasHalf = dish.halfPrice != null;

              return (
                <motion.div
                  layout
                  key={dish.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                >

                  {/* Image and Floating Badges */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => handleOpenDishDetails(dish, portion)}>
                    <img
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={dish.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {dish.isChefSpecial && (
                        <span className="bg-brand-red text-white p-1.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Chef Special">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                        </span>
                      )}
                      {dish.spicyLevel && dish.spicyLevel > 0 ? (
                        <span className="bg-orange-500 text-white p-1.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title={`Spicy Level: ${dish.spicyLevel}`}>
                          <Flame className="w-3.5 h-3.5 fill-current" />
                        </span>
                      ) : null}
                      {dish.isVegetarian && (
                        <span className="bg-emerald-500 text-white p-1.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Pure Vegetarian">
                          <span className="text-[10px] font-bold">V</span>
                        </span>
                      )}
                    </div>

                    {/* Prep Time */}
                    {dish.prepTime && (
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-sans font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-3xs">
                        <Clock className="w-3 h-3" />
                        {dish.prepTime}
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-5 flex flex-col justify-between flex-grow text-left">
                    <div>
                      <h3
                        onClick={() => handleOpenDishDetails(dish, portion)}
                        className="text-lg font-serif font-bold text-gray-900 group-hover:text-brand-red transition-colors cursor-pointer mb-1"
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                        {getEffectiveDescription(dish, portion)}
                      </p>
                    </div>

                    {/* Portion Toggle (only for items with halfPrice) */}
                    {hasHalf && (
                      <div className="mb-3">
                        <PortionToggle
                          portion={portion}
                          onToggle={(p) => setCardPortion(dish.id, p)}
                          fullPrice={dish.price}
                          halfPrice={dish.halfPrice!}
                        />
                      </div>
                    )}

                    {/* Pricing and Action */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-auto">
                      <div>
                        <motion.span
                          key={`${dish.id}-${portion}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xl font-bold font-sans text-brand-red block"
                        >
                          Rs. {activePrice.toLocaleString()}
                        </motion.span>
                        {hasHalf && (
                          <span className="text-[9px] font-sans text-gray-400 uppercase tracking-wide">
                            {portion === 'full' ? 'Full Portion' : 'Half Portion'}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleOpenDishDetails(dish, portion)}
                          className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-brand-red hover:bg-gray-100 flex items-center justify-center transition-colors"
                          title="View recipe details"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleQuickAdd(dish, portion)}
                          className="w-8 h-8 rounded-full bg-brand-yellow hover:bg-brand-darkYellow active:scale-90 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                          title="Add to Table Order"
                        >
                          <Plus className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-gray-800 mb-1">No dishes match your query</h3>
            <p className="text-gray-500 text-xs mb-4">Try removing filters or refining your search parameters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyVegetarian(false);
              }}
              className="bg-brand-red text-white text-2xs font-sans font-bold tracking-wider px-5 py-2.5 rounded-full hover:bg-brand-darkRed transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

      </div>

      {/* ── DISH DETAILS MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-gray-900/70 backdrop-blur-xs"
            />

            {/* Content Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative z-10 shadow-2xl"
            >
              {/* Close Icon */}
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-colors focus:outline-none"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>

              {/* Cover Image */}
              <div className="relative h-56 bg-gray-100">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Title overlay */}
                <div className="absolute bottom-5 left-6 right-6 text-left">
                  <div className="flex gap-2 mb-1">
                    {selectedDish.isVegetarian && (
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">VEGETARIAN</span>
                    )}
                    {selectedDish.isChefSpecial && (
                      <span className="bg-brand-red text-white text-[9px] font-bold px-2 py-0.5 rounded-md">CHEF SPECIAL</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white text-shadow-sm">
                    {selectedDish.name}
                  </h3>
                </div>
              </div>

              {/* Recipe Meta details */}
              <div className="p-6 md:p-8 text-left max-h-[50vh] md:max-h-[450px] overflow-y-auto">
                <div className="flex justify-between items-center text-2xs font-sans font-bold text-gray-500 border-b border-gray-100 pb-3 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow" /> Prep: {selectedDish.prepTime || '15 min'}
                  </span>
                  <span>Category: {selectedDish.category.toUpperCase()}</span>
                  <span>Calories: {selectedDish.calories || '350'} kcal</span>
                </div>

                {/* Portion Selector in Modal */}
                {selectedDish.halfPrice != null && (
                  <div className="mb-5">
                    <p className="text-2xs font-sans font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Portion Size
                    </p>
                    <div className="flex items-center gap-3">
                      <PortionToggle
                        portion={modalPortion}
                        onToggle={setModalPortion}
                        fullPrice={selectedDish.price}
                        halfPrice={selectedDish.halfPrice}
                      />
                      <div className="text-sm">
                        <motion.span
                          key={modalPortion}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="font-bold text-brand-red font-sans"
                        >
                          Rs. {getEffectivePrice(selectedDish, modalPortion).toLocaleString()}
                        </motion.span>
                        <span className="text-[10px] text-gray-400 ml-1">
                          / {modalPortion === 'full' ? 'full' : 'half'} portion
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <h4 className="text-2xs font-sans font-bold text-gray-400 uppercase tracking-widest mb-1.5">Description</h4>
                <motion.p
                  key={`desc-${modalPortion}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 text-xs leading-relaxed mb-6"
                >
                  {getEffectiveDescription(selectedDish, modalPortion)}
                </motion.p>

                {/* Allergy Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-xs flex gap-3">
                  <div className="text-brand-yellow shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 block mb-0.5">Kitchen Allergy & Diet Info</span>
                    <p className="text-gray-500 text-2xs leading-relaxed">
                      This preparation contains authentic dairy, whole grains, ghee, and traditional dry fruits.
                      {selectedDish.spicyLevel && selectedDish.spicyLevel > 1
                        ? ' Features high ground Kashmiri spice levels.'
                        : ' Mild to moderate spice blend.'}
                    </p>
                  </div>
                </div>

                {/* Customization Notes */}
                <div className="mb-6">
                  <label className="text-2xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    Chef Customization Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={dishNotes}
                    onChange={(e) => setDishNotes(e.target.value)}
                    placeholder="e.g. make it extra spicy, serve without green coriander..."
                    className="w-full bg-white text-xs text-gray-700 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                  />
                </div>

                {/* Quantity + Add Button */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 px-2 py-1 shrink-0">
                    <button
                      onClick={() => setDishQuantity(Math.max(1, dishQuantity - 1))}
                      className="w-7 h-7 rounded-full bg-white text-gray-600 hover:text-brand-red flex items-center justify-center font-bold shadow-xs active:scale-90"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">{dishQuantity}</span>
                    <button
                      onClick={() => setDishQuantity(dishQuantity + 1)}
                      className="w-7 h-7 rounded-full bg-white text-gray-600 hover:text-brand-red flex items-center justify-center font-bold shadow-xs active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddFromModal}
                    className="flex-grow bg-brand-red hover:bg-brand-darkRed active:scale-98 text-white text-xs font-sans font-bold tracking-wider py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    ADD TO ORDER — Rs. {(getEffectivePrice(selectedDish, modalPortion) * dishQuantity).toLocaleString()}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
