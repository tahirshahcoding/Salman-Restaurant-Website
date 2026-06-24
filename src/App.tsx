/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import StatsBar from './components/StatsBar';
import ReservationSection from './components/ReservationSection';
import TestimonialsSection from './components/TestimonialsSection';
import SignatureDishes from './components/SignatureDishes';
import CTABanner from './components/CTABanner';
import MilestonesSection from './components/MilestonesSection';
import GalleryStrip from './components/GalleryStrip';
import ReviewsPage from './components/ReviewsPage';

import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import PageBanner from './components/PageBanner';
import { MenuItem, CartItem } from './types';
import { Plus, X, Calendar, Phone, Clock, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load cart from session/local storage
  useEffect(() => {
    const cachedCart = localStorage.getItem('salman_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Sync cart to local storage
  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('salman_cart', JSON.stringify(newCart));
  };

  // Add item to cart
  const handleAddItemToCart = (menuItem: MenuItem, quantity: number, notes?: string) => {
    const existingIndex = cart.findIndex((item) => item.menuItem.id === menuItem.id);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
      if (notes) {
        updatedCart[existingIndex].customNotes = notes;
      }
    } else {
      updatedCart.push({
        menuItem,
        quantity,
        customNotes: notes
      });
    }

    syncCart(updatedCart);
    
    // Auto trigger small interactive sliding tray preview so user knows it added
    setIsCartOpen(true);
  };

  // Update quantity
  const handleUpdateQuantity = (menuItemId: string, newQty: number) => {
    const updatedCart = cart.map((item) => {
      if (item.menuItem.id === menuItemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    syncCart(updatedCart);
  };

  // Remove item from cart
  const handleRemoveItem = (menuItemId: string) => {
    const updatedCart = cart.filter((item) => item.menuItem.id !== menuItemId);
    syncCart(updatedCart);
  };

  // Clear cart
  const handleClearCart = () => {
    syncCart([]);
  };

  // Navigate to sections / pages
  const handleNavigateToSection = (sectionId: string) => {
    if (['home', 'menu', 'about', 'reservation', 'reviews'].includes(sectionId)) {
      setActiveSection(sectionId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (sectionId === 'footer') {
      const element = document.getElementById('footer');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen selection:bg-brand-yellow selection:text-white">
      
      {/* Interactive Header navigation panel */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigateToSection}
      />

      <main className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <Hero
                onExploreMenu={() => handleNavigateToSection('menu')}
                onOpenBooking={() => setIsBookingOpen(true)}
              />
              <Features />
              <SignatureDishes onExploreMenu={() => handleNavigateToSection('menu')} />
              <StatsBar />
              <TestimonialsSection />
              <CTABanner onNavigate={handleNavigateToSection} />
            </motion.div>
          )}

          {activeSection === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <PageBanner title="OUR MENU" subtitle="Delicious Culinary Offerings" />
              <MenuSection
                onAddItemToCart={handleAddItemToCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <PageBanner title="ABOUT US" subtitle="Our Legacy & Kitchen Secrets" />
              <AboutSection />
              <MilestonesSection />
              <GalleryStrip />
              <StatsBar />
            </motion.div>
          )}

          {activeSection === 'reservation' && (
            <motion.div
              key="reservation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <PageBanner title="RESERVATIONS" subtitle="Book Your Table & Experience Hospitality" />
              <ReservationSection />
            </motion.div>
          )}

          {activeSection === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <PageBanner title="REVIEWS" subtitle="Real Experiences from Our Guests" />
              <ReviewsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Responsive Footer column system */}
      <Footer 
        onNavigate={handleNavigateToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* TABLE ORDER DRAWER PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* QUICK TABLE BOOKING OVERLAY MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden max-w-xl w-full relative z-10 shadow-2xl p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-brand-red p-1.5 rounded-full transition-colors focus:outline-none"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>

              <ReservationSection 
                isOpenAsModal={true} 
                onCloseModal={() => setIsBookingOpen(false)}
                onReservationComplete={() => {
                  // Keep modal open so they see success animation and details card
                }}
              />

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
