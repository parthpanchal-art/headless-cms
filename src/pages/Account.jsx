import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // Retrieve data from localStorage
  const token = localStorage.getItem('userToken');
  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // 1. Protection: If no token exists, send user back to login
    if (!token || !userID) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        // 2. Fetch orders specifically for this numeric User ID
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
          // If the token is expired or invalid, force a logout
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl font-medium animate-pulse">Loading your account history...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white-900">My Account</h1>
          <p className="text-gray-500 mt-1">Welcome back, <span className="text-blue-600 font-semibold">{userName}</span></p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="rounded-2xl p-12 text-center border-2 border-dashed">
              <p className="text-white-500 text-lg">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/')}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Start Shopping &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400 font-mono uppercase tracking-widest">Order ID</span>
                    <p className="font-bold text-xl">#{order.number}</p>
                    <p className="text-gray-500">{new Date(order.date_created).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-sm text-gray-400 block uppercase">Total</span>
                      <p className="font-black text-xl">${parseFloat(order.total).toFixed(2)}</p>
                    </div>
                    <div className="min-w-[100px] text-center">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="bg-gray-50 rounded-2xl p-6 h-fit border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Account Details</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-semibold text-gray-900">Name:</span> {userName}</p>
            <p><span className="font-semibold text-gray-900">User ID:</span> {userID}</p>
            <div className="pt-4 mt-4 border-t">
              <p className="italic">Standard shipping details and profile editing coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}