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
        <h1 className="text-4xl font-extrabold">Your <span className="text-gradient">Cart</span></h1>
        <p className="text-slate-500 font-medium">{cart.length} items selected</p>
      </div>

      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[3rem] py-24 text-center border-dashed border-2 border-white/10"
        >
          <div className="inline-flex p-6 rounded-full bg-white/5 mb-6">
            <ShoppingBag size={48} className="text-slate-600" />
          </div>
          <p className="text-slate-400 text-xl mb-8">Your cart feels a bit light...</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            Explore Collection
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-6 rounded-3xl flex items-center gap-6 group relative"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 glass">
                    <img src={item.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                    <p className="text-indigo-400 font-bold mt-1">{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3 glass py-2 px-3 rounded-xl border-white/5">
                    <button className="text-slate-500 hover:text-white transition-colors"><Minus size={16} /></button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button className="text-slate-500 hover:text-white transition-colors"><Plus size={16} /></button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] sticky top-32">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium uppercase tracking-tighter">Calculated at checkout</span>
                </div>
                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Estimated Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">${total.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Include VAT where applicable</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg"
              >
                Checkout Now
                <ArrowRight size={20} />
              </button>
              
              <p className="mt-6 text-center text-xs text-slate-500">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}