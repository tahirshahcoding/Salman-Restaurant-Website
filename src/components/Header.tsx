import React, { useState } from 'react';
import { Phone, Calendar, ShoppingBag, Menu, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import logoImg from '@/assets/images/logo.png';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({
  cart,
  onOpenCart,
  onOpenBooking,
  activeSection,
  onNavigate
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: 'HOME', target: 'home' },
    { label: 'MENU', target: 'menu' },
    { label: 'ABOUT US', target: 'about' },
    { label: 'REVIEWS', target: 'reviews' },
    { label: 'CONTACT', target: 'footer' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header id="app-header" className="bg-transparent absolute top-0 left-0 right-0 z-50 py-3 transition-all duration-300">
        <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex justify-between items-center">

          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none focus:ring-0 group"
          >
            <img
              src={logoImg}
              alt="Salman Restaurant Logo"
              className="h-14 md:h-20 w-auto shrink-0 object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.target;
              return (
                <button
                  key={link.target}
                  onClick={() => handleLinkClick(link.target)}
                  className={`relative py-1 cursor-pointer transition-colors duration-300 focus:outline-none ${isActive
                    ? 'text-brand-red font-extrabold'
                    : 'text-gray-600 hover:text-brand-red'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-brand-red hover:bg-gray-50 rounded-full transition-all focus:outline-none"
              title="View Table Order"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-brand-yellow text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* Table Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden md:flex items-center gap-3 bg-brand-red hover:bg-brand-darkRed active:scale-95 text-white pl-2 pr-5 py-1.5 rounded-full font-sans font-bold tracking-wider transition-all text-xs shadow-lg shadow-red-500/10 cursor-pointer"
            >
              <span className="bg-white text-brand-red p-1.5 rounded-full flex items-center justify-center shadow-sm">
                <Phone className="w-3.5 h-3.5 fill-current" />
              </span>
              BOOK A TABLE
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-brand-red p-1 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[69px] left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40 px-4 py-6"
          >
            <nav className="flex flex-col gap-4 font-sans font-semibold text-sm tracking-widest text-center">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleLinkClick(link.target)}
                  className={`py-2 border-b border-gray-50 last:border-0 ${activeSection === link.target ? 'text-brand-red font-bold' : 'text-gray-600'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-4 flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-bold tracking-wider"
              >
                <Calendar className="w-4 h-4" />
                BOOK A TABLE
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
