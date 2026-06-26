import { motion } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Receipt, Calendar, ArrowRight, Package } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
  orders: Order[];
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  isLoggedIn,
  onOpenAuth,
  orders,
}: CartViewProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 15 ? 0 : 3.99;
  const total = subtotal + delivery;

  return (
    <div id="cart-view-container" className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 mb-12 text-black">
      
      {/* Left Column: Cart items */}
      <div className="flex-1 bg-white border-4 border-black p-6 shadow-neo-md">
        <h2 className="font-display text-xl font-black uppercase text-black border-b-4 border-black pb-3 mb-6 flex items-center gap-2">
          <ShoppingCart size={20} className="text-black" />
          Shopping Cart ({cartItems.length} items)
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <span className="text-4xl mb-3">🛒</span>
            <p className="font-display font-black text-gray-900 text-sm uppercase tracking-wide">Your cart is feeling incredibly empty</p>
            <p className="text-xs text-gray-700 mt-2 max-w-[240px] mx-auto font-bold">
              Browse through our delicious recipes and buy our authentic pre-measured South Asian spice kits!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex items-center gap-4 p-4 border-2 border-black bg-white shadow-neo-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 border-2 border-black object-cover shrink-0 shadow-neo-sm"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-sm uppercase tracking-tight text-black truncate">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-700">For: {item.recipeName}</p>
                  <div className="mt-1 w-fit">
                    <span className="font-mono text-xs font-black text-black bg-yellow-300 px-1.5 py-0.5 border border-black shadow-neo-sm">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Counter controls */}
                <div className="flex items-center gap-2 bg-white border-2 border-black p-1 shrink-0 shadow-neo-sm">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 border border-black bg-white hover:bg-[#FF9933] disabled:opacity-50 text-black cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-mono text-xs font-black w-5 text-center text-black">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 border border-black bg-white hover:bg-[#FF9933] text-black cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 border-2 border-black bg-white hover:bg-rose-500 hover:text-white transition-all shadow-neo-sm shrink-0 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Price breakdown and order summary */}
            <div className="border-t-2 border-black pt-5 space-y-2 text-xs font-bold text-black">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-black text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Delivery</span>
                <span className="font-mono font-black text-[#138808]">
                  {delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-black pt-3 border-t-2 border-black items-center">
                <span>Estimated Total</span>
                <span className="font-mono text-lg font-black text-black bg-yellow-300 px-2 py-0.5 border-2 border-black shadow-neo-sm">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Check Out button */}
            <div className="mt-6">
              {isLoggedIn ? (
                <button
                  onClick={onOpenCheckout}
                  className="w-full bg-[#138808] text-white py-3.5 border-3 border-black font-black uppercase tracking-wider text-xs shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard size={16} />
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="w-full bg-black text-white py-3.5 border-3 border-black font-black uppercase tracking-wider text-xs shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Receipt size={16} />
                  Sign in to Purchase Spice Kits
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Order History */}
      <div className="w-full md:w-[38%] bg-white border-4 border-black p-6 shadow-neo-md flex flex-col">
        <h2 className="font-display text-xl font-black uppercase text-black border-b-4 border-black pb-3 mb-6 flex items-center gap-2">
          <Package size={20} className="text-black" />
          Order History
        </h2>

        {!isLoggedIn ? (
          <div className="text-center py-8 flex flex-col items-center justify-center flex-1">
            <span className="text-3xl mb-2">🔒</span>
            <p className="font-black uppercase tracking-wide text-black text-xs">Password Protected</p>
            <p className="text-[11px] text-gray-700 mt-2 max-w-[200px] font-bold">
              Create an account or login to access your order history and dispatch statuses.
            </p>
            <button
              onClick={onOpenAuth}
              className="mt-4 border-2 border-black bg-black text-white px-4 py-2 hover:bg-[#FF9933] hover:text-black font-black uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer shadow-neo-sm hover:shadow-none"
            >
              Sign In <ArrowRight size={10} />
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 flex flex-col items-center justify-center flex-1 text-gray-500 font-bold">
            <span className="text-2xl mb-2">📦</span>
            <p className="text-xs font-black uppercase tracking-wide text-black">No Orders Placed Yet</p>
            <p className="text-[10px] text-gray-700 mt-0.5">Your orders will register here after checking out.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 border-2 border-black bg-[#FFFBF0] text-xs font-bold text-black space-y-2 shadow-neo-sm">
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                  <span className="font-mono font-black text-black">{ord.id}</span>
                  <span className="font-black text-[9px] uppercase bg-[#138808] text-white px-2 py-0.5 border border-black shadow-neo-sm">
                    {ord.status}
                  </span>
                </div>

                <div className="space-y-1 font-bold">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="truncate max-w-[150px]">{item.name} x{item.quantity}</span>
                      <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-black pt-2 flex justify-between font-black text-black">
                  <span>Total Paid</span>
                  <span className="font-mono text-black font-black bg-yellow-200 px-2 py-0.5 border border-black shadow-neo-sm">${ord.total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-black uppercase mt-1">
                  <Calendar size={10} />
                  <span>{new Date(ord.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
