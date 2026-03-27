import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, "") || 0);
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">Your <span className="text-gradient">Cart</span></h1>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{cart.length} items</p>
      </div>

      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[3rem] py-24 text-center border-dashed border-2 border-slate-200"
        >
          <div className="inline-flex p-6 rounded-full bg-slate-100 mb-6">
            <ShoppingBag size={48} className="text-slate-300" />
          </div>
          <p className="text-slate-500 text-xl mb-8 font-medium">Your cart is empty.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary px-10"
          >
            Start Shopping
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-5 rounded-3xl flex items-center gap-6 group relative bg-white"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
                    <img src={item.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-indigo-600 font-black mt-1">{item.price?.replace('$', '₹')}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Minus size={14} /></button>
                    <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Plus size={14} /></button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-3 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] sticky top-32 bg-white/60 shadow-xl border-white">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 text-xs font-black uppercase">Free</span>
                </div>
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-indigo-700 font-display">₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg shadow-xl shadow-indigo-900/10"
              >
                Proceed to Pay
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}