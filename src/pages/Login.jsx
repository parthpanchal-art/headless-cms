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
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-8 md:p-12 rounded-[3rem] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 text-indigo-400 mb-6">
            <LogIn size={32} />
          </div>
          <h1 className="text-4xl font-extrabold mb-2">Welcome <span className="text-gradient">Back</span></h1>
          <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={14} /> Username or Email
            </label>
            <input
              type="text"
              placeholder="Your username..."
              className="w-full glass bg-white/5 border-white/10 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full glass bg-white/5 border-white/10 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
             <ShieldCheck size={14} className="text-green-500" />
             Secure JWT Authentication
           </div>
           <p className="text-slate-500 text-sm">
             New here? <Link to="/" className="text-indigo-400 font-bold hover:text-indigo-300">Browse Products</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
}
