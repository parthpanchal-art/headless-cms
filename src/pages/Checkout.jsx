import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare line items using numeric databaseId
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
        alert('Order Placed! Check your WordPress Dashboard.');
        localStorage.removeItem('localCart');
        window.location.href = '/';
      } else {
        const error = await response.json();
        console.error('WooCommerce Error:', error);
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert('Failed to connect to server.', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Shipping Details</h1>
      <form onSubmit={handleCheckout} className="space-y-4 p-8 border rounded-2xl shadow-sm">
        <input type="text" placeholder="First Name" required className="w-full border p-3 rounded-lg" 
          onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        <input type="text" placeholder="Last Name" required className="w-full border p-3 rounded-lg" 
          onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        <input type="email" placeholder="Email Address" required className="w-full border p-3 rounded-lg" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <textarea placeholder="Full Shipping Address" required className="w-full border p-3 rounded-lg h-32" 
          onChange={(e) => setFormData({...formData, address: e.target.value})} />
        
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-400">
          {loading ? 'Processing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}