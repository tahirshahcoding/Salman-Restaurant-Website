import React, { useState, useEffect } from 'react';
import { Calendar, Users, Phone, Mail, User, Clock, CheckCircle, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  onReservationComplete?: () => void;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export default function ReservationSection({
  onReservationComplete,
  isOpenAsModal = false,
  onCloseModal
}: ReservationSectionProps) {
  const [savedBookings, setSavedBookings] = useState<Reservation[]>([]);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState<'indoor' | 'outdoor' | 'chefs-table'>('indoor');
  const [requests, setRequests] = useState('');
  
  const [successBooking, setSuccessBooking] = useState<Reservation | null>(null);
  const [validationError, setValidationError] = useState('');

  // Load existing reservations
  useEffect(() => {
    const data = localStorage.getItem('salman_bookings');
    if (data) {
      try {
        setSavedBookings(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const timeSlots = [
    { value: '11:30', label: '11:30 AM (Lunch)' },
    { value: '13:00', label: '01:00 PM (Lunch)' },
    { value: '14:30', label: '02:30 PM (Lunch)' },
    { value: '18:00', label: '06:00 PM (Dinner)' },
    { value: '19:30', label: '07:30 PM (Dinner Bestseller)' },
    { value: '21:00', label: '09:00 PM (Dinner)' },
  ];

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validations
    if (!name.trim()) return setValidationError('Please provide a booking name.');
    if (!email.trim() || !email.includes('@')) return setValidationError('Please provide a valid email address.');
    if (!phone.trim() || phone.length < 8) return setValidationError('Please enter a valid telephone number.');
    if (!date) return setValidationError('Please select a dining date.');

    const newBooking: Reservation = {
      id: 'res-' + Date.now(),
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingPreference: seating,
      specialRequests: requests,
      createdAt: new Date().toLocaleString()
    };

    const updatedBookings = [newBooking, ...savedBookings];
    setSavedBookings(updatedBookings);
    localStorage.setItem('salman_bookings', JSON.stringify(updatedBookings));

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setRequests('');
    setGuests(2);
    setSeating('indoor');

    // Show Success View
    setSuccessBooking(newBooking);
    
    if (onReservationComplete) {
      onReservationComplete();
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = savedBookings.filter(b => b.id !== bookingId);
    setSavedBookings(updated);
    localStorage.setItem('salman_bookings', JSON.stringify(updated));
  };

  const tomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section id="reservation" className={`py-20 text-left ${isOpenAsModal ? 'bg-white p-0' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 ${isOpenAsModal ? 'max-w-5xl' : ''}`}>
        
        {/* Section Header */}
        {!isOpenAsModal && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-brand-yellow" />
              <span className="text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">RESERVATION</span>
              <span className="w-8 h-[2px] bg-brand-yellow" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Book Your <span className="text-brand-red font-script text-5xl md:text-6xl font-normal">Private Table</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-sans">
              Choose your ambient seating layout, schedule, and let our team prepare your bespoke hospitality experience.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation Booking Form (Left side) */}
          <div className={`${isOpenAsModal ? 'lg:col-span-12' : 'lg:col-span-7'} bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100`}>
            
            <AnimatePresence mode="wait">
              {!successBooking ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookTable} 
                  className="space-y-6"
                >
                  <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                    <Calendar className="w-5.5 h-5.5 text-brand-red" />
                    Reserve Table Details
                  </h3>

                  {validationError && (
                    <div className="bg-red-50 text-brand-red text-xs p-3.5 rounded-xl font-sans border border-red-100">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ahmad Raza"
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                        />
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@domain.com"
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                        />
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Telephone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +92 300 1234567"
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                        />
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Dining Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          min={tomorrowStr()}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Time Slot Selector */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Available Slot</label>
                      <div className="relative">
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow appearance-none"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                          ))}
                        </select>
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Number of Guests</label>
                      <div className="relative">
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'Guests'}</option>
                          ))}
                        </select>
                        <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Seating Preference */}
                    <div>
                      <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Seating Area</label>
                      <div className="relative">
                        <select
                          value={seating}
                          onChange={(e) => setSeating(e.target.value as any)}
                          className="w-full bg-gray-50/50 text-xs text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow appearance-none"
                        >
                          <option value="indoor">Indoor Hall (Ambient)</option>
                          <option value="outdoor">Outdoor Terrace (Scenic)</option>
                          <option value="chefs-table">Chef's Table (Private)</option>
                        </select>
                        <ShieldCheck className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Special requests */}
                  <div>
                    <label className="text-3xs font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2">Special Requests &amp; Dietary Notes</label>
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="e.g. wedding anniversary celebration, high-chair for toddler, allergen warnings..."
                      rows={3}
                      className="w-full bg-gray-50/50 text-xs text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                    />
                  </div>

                  {/* Submit CTA */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-darkRed text-white font-sans font-bold text-xs tracking-wider py-4 rounded-xl shadow-md shadow-red-500/10 cursor-pointer"
                  >
                    CONFIRM SECURE TABLE BOOKING
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
                    <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                      Assalamu Alaikum, {successBooking.name}. Your table reservation has been confirmed and logged into Salman Restaurant's system successfully.
                    </p>
                  </div>

                  {/* Booking Receipt Summary Card */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-sm mx-auto text-left space-y-3.5 font-sans">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 uppercase font-semibold">Booking ID</span>
                      <span className="font-mono text-gray-800 font-bold">{successBooking.id}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between text-xs">
                      <span className="text-gray-400">Guests</span>
                      <span className="font-bold text-gray-800">{successBooking.guests} People</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Dining Date</span>
                      <span className="font-bold text-gray-800">{successBooking.date}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Selected Slot</span>
                      <span className="font-bold text-gray-800">{successBooking.time}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Seating Preference</span>
                      <span className="font-bold text-brand-red uppercase">{successBooking.seatingPreference}</span>
                    </div>
                    {successBooking.specialRequests && (
                      <div className="border-t border-gray-100 pt-3 text-[11px]">
                        <span className="text-gray-400 block mb-1">Notes:</span>
                        <p className="text-gray-600 italic">"{successBooking.specialRequests}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSuccessBooking(null)}
                      className="bg-brand-yellow hover:bg-brand-darkYellow text-white text-3xs font-sans font-bold tracking-wider px-6 py-3 rounded-full transition-colors"
                    >
                      BOOK ANOTHER TABLE
                    </button>
                    {onCloseModal && (
                      <button
                        onClick={onCloseModal}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-3xs font-sans font-bold tracking-wider px-6 py-3 rounded-full transition-colors"
                      >
                        CLOSE WINDOW
                      </button>
                    )}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Booking History / Active Booking manager (Right side) */}
          {!isOpenAsModal && (
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 text-left h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                  <Clock className="w-5.5 h-5.5 text-brand-yellow" />
                  My Active Bookings
                </h3>

                {savedBookings.length > 0 ? (
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    {savedBookings.map((b) => (
                      <div key={b.id} className="bg-gray-50 hover:bg-gray-100/70 p-4 rounded-2xl border border-gray-100 transition-colors flex justify-between items-start gap-4">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{b.name}</span>
                            <span className="bg-brand-red/10 text-brand-red text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                              {b.seatingPreference}
                            </span>
                          </div>
                          <p className="text-gray-500 font-sans text-2xs flex items-center gap-1">
                            📅 {b.date} &nbsp;•&nbsp; 🕒 {b.time}
                          </p>
                          <p className="text-gray-400 font-sans text-3xs">
                            Guests: {b.guests} | Phone: {b.phone}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="text-gray-400 hover:text-brand-red p-1 rounded-full hover:bg-gray-200/50 transition-colors"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-400 space-y-3 font-sans">
                    <Calendar className="w-12 h-12 text-gray-200 mx-auto" />
                    <h4 className="text-xs font-bold text-gray-500">No active reservations found</h4>
                    <p className="text-3xs text-gray-400 max-w-xs mx-auto">
                      Bookings you make in this browser session will be stored here securely via local persistence.
                    </p>
                  </div>
                )}
              </div>

              {/* Dynamic stamp/badge to enrich the visuals */}
              <div className="bg-brand-red/5 border border-dashed border-brand-red/30 p-4 rounded-2xl mt-6 flex gap-3 text-xs items-center">
                <div className="text-brand-red shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div className="font-sans">
                  <span className="font-bold text-gray-800 block mb-0.5">Need customized private hosting?</span>
                  <p className="text-gray-500 text-3xs leading-relaxed">
                    Our VIP room accommodates up to 40 guests. Contact our event manager at +1 234 567 8900 for tailored menus.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
