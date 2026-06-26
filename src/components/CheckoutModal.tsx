import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShoppingBag, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  authToken: string;
  onCheckoutSuccess: (orders: Order[]) => void;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, authToken, onCheckoutSuccess }: CheckoutModalProps) {
  const [address, setAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 15 ? 0 : 3.99;
  const total = subtotal + delivery;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          address,
          paymentDetails: {
            cardNumber: cardNumber.slice(-4) // just send last 4 digits mock
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to checkout');
      }

      setSuccessOrder(data.order);
      onCheckoutSuccess(data.orders);
    } catch (err) {
      console.error(err);
      alert('Checkout process failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            id="checkout-modal-content"
            className="relative w-full max-w-2xl overflow-hidden border-4 border-black bg-white shadow-neo-lg flex flex-col max-h-[90vh] text-black"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              id="checkout-close-btn"
              className="absolute top-5 right-5 border-2 border-black bg-white p-2 text-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            {!successOrder ? (
              <form onSubmit={handleCheckout} className="flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-black border-black overflow-y-auto">
                {/* Left Side: Order summary */}
                <div className="flex-1 p-8 bg-[#FFFBF0] overflow-y-auto">
                  <h3 className="font-display text-lg font-black uppercase text-black mb-4 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-black" />
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-4 text-xs font-bold">
                        <div className="flex-1">
                          <p className="font-black uppercase text-black">{item.name}</p>
                          <p className="text-[10px] text-gray-700">For: {item.recipeName}</p>
                          <p className="text-[10px] text-gray-700">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono text-black font-black bg-yellow-200 px-1.5 py-0.5 border border-black shadow-neo-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-black pt-4 space-y-2 text-xs font-bold">
                    <div className="flex justify-between text-black">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-black">
                      <span>Delivery</span>
                      <span className="font-mono">{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-black text-black pt-2 border-t-2 border-black text-sm items-center">
                      <span>Total Amount</span>
                      <span className="font-mono text-black font-black bg-yellow-300 px-2 py-0.5 border-2 border-black shadow-neo-sm">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 border-2 border-black bg-yellow-100 text-xs text-black font-bold shadow-neo-sm">
                    🌟 <strong>Free Delivery:</strong> Spend over $15 to get free shipping across the country!
                  </div>
                </div>

                {/* Right Side: Secure Checkout details */}
                <div className="flex-1 p-8 overflow-y-auto bg-white">
                  <h3 className="font-display text-lg font-black uppercase text-black mb-5 flex items-center gap-2">
                    <CreditCard size={20} className="text-black" />
                    Secure Payment
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-black mb-1.5 flex items-center gap-1">
                        <MapPin size={12} /> Delivery Address
                      </label>
                      <textarea
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Apartment, Street Name, City, Zip"
                        rows={2}
                        className="w-full border-2 border-black bg-white p-3 text-sm text-black font-bold focus:outline-none placeholder:text-gray-400 shadow-neo-sm"
                      />
                    </div>

                    <div className="border-t-2 border-black pt-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-black mb-3">Card Details (Simulated)</p>
                      
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Cardholder Name"
                            className="w-full border-2 border-black bg-white px-3.5 py-2.5 text-sm text-black font-bold focus:outline-none shadow-neo-sm"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="16-Digit Card Number"
                            className="w-full border-2 border-black bg-white px-3.5 py-2.5 text-sm text-black font-bold focus:outline-none shadow-neo-sm"
                          />
                        </div>

                        <div className="flex gap-3">
                          <input
                            type="text"
                            required
                            value={expiry}
                            placeholder="MM/YY"
                            onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                            className="w-1/2 border-2 border-black bg-white px-3.5 py-2.5 text-sm text-black font-bold focus:outline-none text-center shadow-neo-sm"
                          />
                          <input
                            type="password"
                            required
                            value={cvv}
                            placeholder="CVV"
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            className="w-1/2 border-2 border-black bg-white px-3.5 py-2.5 text-sm text-black font-bold focus:outline-none text-center shadow-neo-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#138808] text-white hover:bg-black hover:text-white border-3 border-black py-4 font-black uppercase tracking-wider text-xs shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Authorizing Ghee & Spices...</span>
                        </div>
                      ) : (
                        `Pay & Place Order`
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="p-12 text-center flex flex-col items-center justify-center bg-[#FFFBF0]">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="mb-4 text-[#138808] h-16 w-16 bg-white rounded-full flex items-center justify-center border-3 border-black shadow-neo-sm"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                
                <h3 className="font-display text-3xl font-black uppercase tracking-tight text-black mb-2">Order Confirmed! 🎉</h3>
                <p className="text-black text-sm max-w-md mx-auto mb-6 font-bold leading-tight">
                  Adaab! Your payment was secure. We have registered your order <strong className="font-mono text-black font-black bg-yellow-200 px-1 py-0.5 border border-black">{successOrder.id}</strong> on our server. Your fresh whole spices and kits will be packaged and shipped shortly.
                </p>

                <div className="w-full max-w-sm bg-yellow-100 border-2 border-black p-4 text-left text-sm space-y-2 mb-6 shadow-neo-md font-bold">
                  <div className="flex justify-between text-black">
                    <span>Order Total:</span>
                    <span className="font-black font-mono">${successOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Delivery Address:</span>
                    <span className="font-black text-right max-w-[200px] truncate">{successOrder.address}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#FF9933] hover:text-black border-3 border-black px-6 py-3 font-black uppercase tracking-wider text-xs shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
