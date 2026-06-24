import React, { useState } from 'react';
import { Twitter, Instagram, Youtube, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '@/assets/images/logo.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    // Simulate database subscription log
    setSubscribedSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribedSuccess(false);
    }, 4000);
  };

  return (
    <footer id="footer" className="bg-[#111111] text-gray-400 pt-16 pb-8 text-left font-sans text-xs">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
            >
              <img
                alt="Salman Restaurant Logo"
                className="h-16 w-auto object-contain"
                src={logoImg}
              />
            </button>

            <p className="text-gray-400 text-xs leading-relaxed">
              Delicious premium food, warm authentic hospitality, and beautiful lingering moments — exclusively at Salman Restaurant.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, href: '#' },
                { icon: <Instagram className="w-4 h-4" />, href: '#' },
                { icon: <Youtube className="w-4 h-4" />, href: '#' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-sans font-bold text-xs tracking-widest uppercase mb-6 border-l-2 border-brand-yellow pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 font-medium">
              {[
                { label: 'Home Page', target: 'home' },
                { label: 'Specials', target: 'menu' },
                { label: 'About History', target: 'about' },
                { label: 'Bookings Portal', target: 'reservation' },
                { label: 'Contact Info', target: 'footer' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="hover:text-brand-red transition-colors duration-200 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Menu Categories */}
          <div>
            <h4 className="text-white font-sans font-bold text-xs tracking-widest uppercase mb-6 border-l-2 border-brand-red pl-3">
              Our Menu
            </h4>
            <ul className="space-y-3 font-medium">
              {[
                { label: 'Tandoori Platters', target: 'menu' },
                { label: 'Heritage Biryani', target: 'menu' },
                { label: 'Mughlai Main Course', target: 'menu' },
                { label: 'Clay-oven Breads', target: 'menu' },
                { label: 'Shahi Sweet Delicacies', target: 'menu' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.target)}
                    className="hover:text-brand-red transition-colors duration-200 cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-sans font-bold text-xs tracking-widest uppercase mb-6 border-l-2 border-brand-yellow pl-3">
              Contact Us
            </h4>

            <ul className="space-y-3 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-brand-red shrink-0" />
                <span>Chota Kalam Ningolai Swat, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-brand-red shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-brand-red shrink-0" />
                <span>info@salmanrestaurant.com</span>
              </li>
            </ul>

            {/* Newsletter subscriber */}
            <div className="pt-2">
              <h5 className="text-white font-bold mb-3 uppercase text-2xs tracking-wider">Join Newsletter</h5>
              <AnimatePresence mode="wait">
                {!subscribedSuccess ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="flex w-full"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      className="bg-gray-800 text-2xs text-white px-4 py-2.5 w-full focus:outline-none focus:ring-1 focus:ring-brand-yellow border-none rounded-l-xl placeholder-gray-500"
                    />
                    <button
                      type="submit"
                      className="bg-brand-yellow hover:bg-brand-darkYellow text-white px-4 py-2.5 text-3xs font-extrabold tracking-wider transition-colors rounded-r-xl shrink-0 cursor-pointer"
                    >
                      SUBSCRIBE
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-2.5 rounded-xl flex items-center gap-2 text-3xs"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Subscribed successfully! Welcome to the table.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
          <p>© 2026 Salman Restaurant. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
