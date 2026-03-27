import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, User, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://shivtechsolution.com/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user_display_name);
        localStorage.setItem("userID", data.user_id); 
        navigate("/account");
      } else {
        alert("Login Failed: " + data.message);
      }
    } catch (err) {
       console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-sm p-8 md:p-12 rounded-[3.5rem] relative z-10 bg-white shadow-2xl shadow-indigo-900/5 focus-within:shadow-indigo-900/10 transition-shadow"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-[2rem] bg-indigo-50 text-indigo-600 mb-6 shadow-inner">
            <LogIn size={32} />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-slate-900">Sign <span className="text-gradient">In</span></h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Member Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={12} className="text-indigo-400" /> Username
            </label>
            <input
              type="text"
              placeholder="e.g. john_doe"
              className="w-full glass bg-slate-50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Lock size={12} className="text-indigo-400" /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full glass bg-slate-50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg font-bold shadow-xl shadow-indigo-900/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
             <ShieldCheck size={14} className="text-green-600" />
             Verified Connection
           </div>
           <p className="text-slate-500 text-sm font-medium">
             Need an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
}
