import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, LogOut, Calendar, Tag, ChevronRight, ShoppingBag, Bell } from 'lucide-react';

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
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-[10px]">Synchronizing...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Profile Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3.5rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden bg-white shadow-2xl shadow-indigo-900/5 border-white"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 blur-[100px] rounded-full"></div>
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-4 border-white overflow-hidden">
                 <User size={48} className="text-indigo-600" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 ring-4 ring-white rounded-full flex items-center justify-center text-white">
               <ShieldCheck size={14} />
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2 block">Customer Dashboard</span>
            <h1 className="text-4xl font-extrabold mb-1 text-slate-900">Welcome, <span className="text-gradient">{userName}</span></h1>
            <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
              <Tag size={12} className="text-slate-300" />
              ID: SHIV-{userID}
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="px-8 py-3 rounded-2xl border border-red-100 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 group shadow-sm bg-white"
        >
          <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
          Sign Out
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Package size={24} className="text-indigo-600" />
              Recent <span className="text-indigo-600">History</span>
            </h2>
            <div className="h-px flex-1 mx-6 bg-slate-100 italic"></div>
          </div>
          
          <AnimatePresence>
            {orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-[3rem] p-16 text-center border-dashed border-2 border-slate-200 bg-white/40"
              >
                <div className="inline-flex p-6 rounded-[2.5rem] bg-slate-50 mb-6">
                  <ShoppingBag size={40} className="text-slate-200" />
                </div>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-8">No order history available</p>
                <Link to="/" className="btn-primary px-10">Marketplace</Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={order.id} 
                    className="glass p-5 rounded-[2rem] group flex flex-col md:flex-row justify-between items-center gap-6 bg-white hover:shadow-xl hover:shadow-indigo-900/5 transition-all border-white/60"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                        <Package size={24} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ORDER NUM</p>
                        <p className="font-black text-lg text-slate-900">#{order.number}</p>
                      </div>
                      <div className="hidden md:block h-10 w-px bg-slate-100"></div>
                      <div className="space-y-0.5 hidden md:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PLACED ON</p>
                        <p className="text-slate-600 text-sm font-bold uppercase">{new Date(order.date_created).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">TOTAL AMOUNT</p>
                        <p className="font-black text-2xl text-slate-900">₹{parseFloat(order.total).toFixed(2)}</p>
                      </div>
                      <div className="min-w-[120px]">
                        <span className={`w-full block py-2.5 rounded-xl text-[10px] font-black uppercase text-center tracking-widest border ${
                          order.status === 'completed' ? 'bg-green-50 border-green-100 text-green-700' : 
                          order.status === 'processing' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <button className="p-3 bg-slate-50 rounded-2xl text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass p-8 rounded-[3rem] bg-white border-white shadow-xl shadow-slate-200/50"
           >
             <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                Account Settings
                <Bell size={18} className="text-slate-300" />
             </h3>
             <div className="space-y-4">
                <div className="p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Shipping Method</p>
                   <p className="text-sm font-bold text-slate-600">Standard Fulfillment</p>
                </div>
                <div className="p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Communication</p>
                   <p className="text-sm font-bold text-slate-600">SMS & Email Enabled</p>
                </div>
                <button className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-[1.02] transition-all mt-4">
                   Edit Personal Details
                </button>
             </div>
           </motion.div>

           <div className="glass p-8 rounded-[3rem] bg-indigo-900 text-white shadow-2xl shadow-indigo-900/20">
              <h4 className="font-black text-indigo-200 mb-3 uppercase tracking-widest text-xs">Priority Support</h4>
              <p className="text-sm text-indigo-100/70 font-medium leading-relaxed mb-8">Direct access to our dedicated branding specialists for any inquiries.</p>
              <button className="w-full py-4 rounded-2xl bg-white text-indigo-900 font-extrabold flex items-center justify-center gap-3 group">
                Open Ticket
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ size }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}