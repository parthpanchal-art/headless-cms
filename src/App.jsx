import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart, User, House } from "lucide-react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-100">
        <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-gradient">
              LUMINA STORE
            </Link>
            
            <nav className="flex items-center space-x-8">
              <Link to="/" className="flex items-center gap-2 hover:text-indigo-400 transition-colors font-medium">
                <House size={20} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-2 hover:text-indigo-400 transition-colors font-medium">
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link to="/account" className="flex items-center gap-2 hover:text-indigo-400 transition-colors font-medium">
                <User size={20} />
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
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        
        <footer className="mt-20 py-10 border-t border-white/5 text-center text-slate-500">
          <p>&copy; 2024 Lumina Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
