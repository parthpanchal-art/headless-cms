import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    // Strips currency symbols to calculate total
    const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, "") || 0);
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div className="container mx-auto p-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20 rounded-2xl">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 font-semibold underline">Go Shopping</button>
        </div>
      ) : (
        <div className="border rounded-2xl p-6 shadow-sm">
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-6 last:border-0">
                <div className="flex items-center gap-4">
                  <img src={item.featuredImage?.node?.sourceUrl} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-500">{item.price} x {item.quantity}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium">Remove</button>
              </div>
            ))}
          </div>
          
          <div className="mt-10 border-t pt-6 flex flex-col items-end">
            <p className="text-xl font-bold mb-4">Estimated Total: ${total.toFixed(2)}</p>
            <button 
              onClick={() => navigate('/checkout')}
              className="bg-black text-white px-12 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}