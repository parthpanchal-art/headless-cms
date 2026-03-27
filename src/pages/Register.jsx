import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const CK = 'ck_abd95d9b530e292510f2eab0a1e29049e91e7046';
  const CS = 'cs_dd428088fb55c588d18564045e91a9489a7d7241';

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const customerData = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch("https://shivtechsolution.com/wp-json/wc/v3/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(`${CK}:${CS}`)
        },
        body: JSON.stringify(customerData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        alert("Registration Failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass max-w-md w-full p-12 rounded-[3.5rem] text-center bg-white shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Account Created!</h2>
          <p className="text-slate-500 mb-8 font-medium text-lg">Your account has been successfully registered. Redirecting you to login...</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-indigo-600"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-lg p-8 md:p-12 rounded-[3.5rem] relative z-10 bg-white shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-[2rem] bg-indigo-50 text-indigo-600 mb-6 shadow-inner">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-slate-900">Join <span className="text-gradient">Shiv Tech</span></h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input
                type="text"
                required
                className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input
                type="text"
                required
                className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Mail size={12} className="text-indigo-400" /> Email Address
            </label>
            <input
              type="email"
              required
              className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={12} className="text-indigo-400" /> Username
            </label>
            <input
              type="text"
              required
              className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Lock size={12} className="text-indigo-400" /> Password
            </label>
            <input
              type="password"
              required
              className="w-full glass bg-slate-50/50 border-slate-100 p-4 rounded-2xl focus:border-indigo-600 outline-none transition-all text-slate-900"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg font-bold shadow-xl shadow-indigo-900/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
           <p className="text-slate-500 text-sm font-medium">
             Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
}
