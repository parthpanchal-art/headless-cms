import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, LogOut, Calendar, Tag, ChevronRight, ShoppingBag } from 'lucide-react';

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const token = localStorage.getItem('userToken');
  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (!token || !userID) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://shivtechsolution.com/wp-json/wc/v3/orders?customer=${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          if (response.status === 401 || response.status === 403) {
            handleLogout();
          }
          throw new Error(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, userID, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium">Gearing up your account...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900 overflow-hidden">
               <User size={48} className="text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-1 block">Account Dashboard</span>
            <h1 className="text-4xl font-extrabold mb-1">Hello, <span className="text-gradient">{userName}</span></h1>
            <p className="text-slate-400 flex items-center gap-2">
              <Tag size={14} className="text-indigo-500" />
              Member ID: {userID}
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="px-8 py-3 rounded-2xl border border-red-500/20 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Sign Out
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Section: Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Package size={24} className="text-indigo-400" />
              Recent <span className="text-indigo-400">Orders</span>
            </h2>
            <div className="h-px flex-1 mx-6 bg-white/5"></div>
          </div>
          
          <AnimatePresence>
            {orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-[2.5rem] p-16 text-center border-dashed border-2 border-white/5"
              >
                <div className="inline-flex p-5 rounded-3xl bg-white/5 mb-6">
                  <ShoppingBag size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-400 mb-8">No order history found.</p>
                <Link to="/" className="text-indigo-400 font-bold hover:underline">Start your journey &rarr;</Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={order.id} 
                    className="glass p-6 rounded-3xl group flex flex-col md:flex-row justify-between items-center gap-6 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Package size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order Reference</p>
                        <p className="font-bold text-lg">#{order.number}</p>
                      </div>
                      <div className="hidden md:block h-8 w-px bg-white/5"></div>
                      <div className="space-y-1 hidden md:block">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                          <Calendar size={10} /> Date
                        </p>
                        <p className="text-slate-400 text-sm font-medium">{new Date(order.date_created).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total</p>
                        <p className="font-black text-xl text-white">${parseFloat(order.total).toFixed(2)}</p>
                      </div>
                      <div className="min-w-[120px]">
                        <span className={`w-full block py-2 rounded-xl text-[10px] font-black uppercase text-center tracking-[0.2em] ${
                          order.status === 'completed' ? 'bg-green-500/10 text-green-400' : 
                          order.status === 'processing' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-slate-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <button className="p-2 text-slate-600 group-hover:text-indigo-400 transition-colors">
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass p-8 rounded-[2.5rem]"
           >
             <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
             <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Default Shipping</p>
                   <p className="text-sm font-medium text-slate-300">No primary address saved.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Preferences</p>
                   <p className="text-sm font-medium text-slate-300">Promotions enabled.</p>
                </div>
                <button className="w-full py-4 rounded-2xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all text-sm">
                   Edit Profile
                </button>
             </div>
           </motion.div>

           <div className="glass p-8 rounded-[2.5rem] border-indigo-500/10">
              <h4 className="font-bold text-indigo-400 mb-2">Need help?</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Our support team is available 24/7 to assist with your orders.</p>
              <button className="text-indigo-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Contact Support <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}