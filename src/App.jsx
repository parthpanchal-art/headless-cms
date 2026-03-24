import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MY STORE
        </Link>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        {/* 2. Add the /cart route here */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
