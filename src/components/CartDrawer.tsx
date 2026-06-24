import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Send, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, newQty: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
  const [tableNumber, setTableNumber] = useState('04');

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const serviceCharge = subtotal > 0 ? 150 : 0;
  const total = subtotal + serviceCharge;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setIsOrdering(true);

    // Simulate sending order to kitchen tandoor dashboard
    setTimeout(() => {
      setIsOrdering(false);
      setOrderPlacedSuccess(true);
      
      setTimeout(() => {
        setOrderPlacedSuccess(false);
        onClearCart();
        onClose();
      }, 3500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans text-xs text-left">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer container absolute right */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="bg-brand-red/10 p-1.5 rounded-lg text-brand-red">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-none">Your Table Order</h3>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase">Tandoor Draft List</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-brand-red p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                  title="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                
                {/* Simulated Table Assignment Indicator */}
                <div className="bg-brand-yellow/10 p-3.5 rounded-xl border border-brand-yellow/20 flex justify-between items-center">
                  <span className="text-2xs font-semibold text-gray-600">Active Dining Table Assignment</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-3xs font-bold text-brand-darkYellow uppercase">Table:</span>
                    <input
                      type="text"
                      maxLength={3}
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-10 bg-white text-center font-bold text-brand-red border border-gray-200 py-0.5 rounded focus:outline-none focus:border-brand-yellow"
                    />
                  </div>
                </div>

                {orderPlacedSuccess ? (
                  /* ORDER PLACED SUCCESS PANEL */
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-gray-900 mb-1">Sent to Kitchen!</h4>
                      <p className="text-gray-500 text-3xs max-w-xs mx-auto leading-relaxed">
                        Your order tickets have been sent to Salman Restaurant's kitchen. Get ready for an amazing experience!
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs mx-auto text-center font-bold text-brand-red font-mono text-2xs animate-pulse">
                      ESTIMATED PREP TIME: 20-25 MIN
                    </div>
                  </div>
                ) : cart.length > 0 ? (
                  /* LIST OF ITEMS */
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.menuItem.id} className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100 flex gap-4">
                        {/* Dish thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Middle info */}
                        <div className="flex-1 text-left flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className="font-bold text-gray-900 text-xs leading-none">{item.menuItem.name}</span>
                              <span className="font-bold text-brand-red shrink-0">Rs. {(item.menuItem.price * item.quantity).toLocaleString()}</span>
                            </div>
                            {item.customNotes && (
                              <p className="text-brand-yellow text-3xs mt-1 font-semibold">
                                Note: "{item.customNotes}"
                              </p>
                            )}
                          </div>

                          {/* Controls */}
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center bg-white border border-gray-100 rounded-full py-0.5 px-1.5 gap-2 shadow-2xs">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                                className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600 transition-colors"
                              >
                                -
                              </button>
                              <span className="font-bold text-gray-800 text-3xs">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600 transition-colors"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-gray-400 hover:text-brand-red p-1 rounded-full transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  /* EMPTY CART VIEW */
                  <div className="text-center py-20 space-y-4">
                    <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-500">Your order tray is empty</h4>
                      <p className="text-3xs text-gray-400 max-w-xs mx-auto mt-1 leading-relaxed">
                        Navigate to our menu to select delicious dishes to add to your dining order.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer Summary / Pricing */}
              {cart.length > 0 && !orderPlacedSuccess && (
                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                  
                  {/* Pricing Rows */}
                  <div className="space-y-2 text-2xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-gray-800">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">Table Service Surcharge <Info className="w-3 h-3 text-gray-400" title="Optional fine hospitality table seating setup" /></span>
                      <span className="font-semibold text-gray-800">Rs. {serviceCharge.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-xs font-bold text-gray-900">
                      <span>Total Invoice</span>
                      <span className="text-brand-red">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Ordering CTAs */}
                  <div className="space-y-2">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isOrdering}
                      className="w-full bg-brand-red hover:bg-brand-darkRed active:scale-98 disabled:opacity-50 text-white font-bold tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-500/10"
                    >
                      {isOrdering ? (
                        <span className="animate-pulse">TRANSMITTING TO KITCHEN...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          SUBMIT TO TANDOOR KITCHEN
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={onClearCart}
                      className="w-full bg-white hover:bg-gray-100 text-gray-500 font-sans font-bold tracking-wider py-2 rounded-xl transition-colors text-3xs border border-gray-200"
                    >
                      CLEAR ALL DRAFT ITEMS
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
