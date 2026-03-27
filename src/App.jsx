import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart, User, House } from "lucide-react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Logo from "./assets/shiv-tech-sol.webp";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen text-slate-900">
        <header className="sticky top-0 z-50 glass border-b border-indigo-900/5 px-6 py-3">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Shiv Tech Solution" className="h-10 md:h-12 w-auto object-contain" />
            </Link>

            <nav className="flex items-center space-x-8">
              <Link to="/" className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-semibold text-sm md:text-base">
                <House size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-semibold text-sm md:text-base">
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link to="/account" className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-semibold text-sm md:text-base">
                <User size={18} />
                <span className="hidden sm:inline">Account</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>

        <footer className="mt-20 py-12 border-t border-indigo-900/5 text-center text-slate-500 bg-slate-50/50">
          <div className="flex flex-col items-center gap-4 mb-4">
            <img src={Logo} alt="Shiv Tech Solution" className="h-8 opacity-70 grayscale hover:grayscale-0 transition-all" />
          </div>
          <p className="font-medium">&copy; 2026 Shiv Tech Solution. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
