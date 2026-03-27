import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CreditCard, Truck, User, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, "") || 0);
    return acc + (price * item.quantity);
  }, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const lineItems = cart.map(item => ({
      product_id: parseInt(item.databaseId), 
      quantity: item.quantity
    }));

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        email: formData.email,
      },
      line_items: lineItems
    };

    const CK = 'ck_abd95d9b530e292510f2eab0a1e29049e91e7046';
    const CS = 'cs_dd428088fb55c588d18564045e91a9489a7d7241';

    try {
      const response = await fetch('https://shivtechsolution.com/wp-json/wc/v3/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${CK}:${CS}`)
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setStep(3); // Success step
        localStorage.removeItem('localCart');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert('Failed to connect to server.', err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[3.5rem] border-green-100 bg-white"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-slate-900">Success!</h1>
          <p className="text-slate-500 text-lg mb-10">We've received your order. A confirmation has been sent to <span className="text-indigo-600 font-bold">{formData.email}</span>.</p>
          <Link to="/" className="btn-primary px-12 py-4">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/cart" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 transition-colors font-bold text-sm">
        <ArrowLeft size={18} />
        BACK TO CART
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-[2.5rem] bg-white shadow-xl shadow-slate-100 border-white/40"
        >
          <h2 className="text-3xl font-extrabold mb-10 text-slate-900">
            Secure <span className="text-indigo-600">Checkout</span>
          </h2>
          
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  required 
                  className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900 placeholder:text-slate-300" 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  required 
                  className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900 placeholder:text-slate-300" 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                required 
                className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900 placeholder:text-slate-300" 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Address</label>
              <textarea 
                placeholder="Your shipping destination..." 
                required 
                className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl h-32 focus:border-indigo-600 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-300" 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 disabled:bg-slate-300 shadow-xl shadow-indigo-900/10"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Confirm Order
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[2.5rem] bg-indigo-50/30 border-white"
          >
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">Review Order</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-white/50 p-3 rounded-2xl">
                  <div className="w-14 h-14 rounded-xl overflow-hidden glass bg-slate-100 shrink-0">
                    <img src={item.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-slate-900 line-clamp-1">{item.title}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">QTY: {item.quantity}</p>
                  </div>
                  <p className="font-black text-indigo-700 text-sm whitespace-nowrap">{item.price}</p>
                </div>
              ))}
            </div>
            
            <div className="h-px bg-slate-200/50 my-6"></div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-extrabold text-lg text-slate-900">Final Total</span>
                <span className="text-2xl font-black text-slate-900">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center gap-3">
               <ShieldCheck size={20} />
               <p className="text-xs font-bold uppercase tracking-tighter">Secure Checkout Powered by SHIV TECH</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}