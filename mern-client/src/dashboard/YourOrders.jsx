import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';

const YourOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load the Razorpay script dynamically
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error('Failed to load Razorpay script');
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async (order) => {
    if (!scriptLoaded) {
      console.error('Razorpay script is not loaded yet.');
      alert('Razorpay script is not loaded. Please try again later.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: order.price, // Amount should be in the smallest currency unit
          currency: 'INR',
          receipt: order._id
        })
      });
      const data = await response.json();

      if (data && data.id) {
        const options = {
          key: ({}).REACT_APP_RAZORPAY_KEY_ID, // Correctly access the API key from environment variables
          amount: data.amount,
          currency: data.currency,
          name: "Neema Rao",
          description: "Test Mode",
          order_id: data.id,
          handler: async (response) => {
            try {
              const res = await fetch(`http://localhost:5000/api/payment/order`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                })
              });
        
              const verifyData = await res.json();
        
              if (verifyData.message) {
                toast.success(verifyData.message);
              }
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#5f63b8"
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment processing failed');
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const filteredOrders = data.filter(order => 
          order.userId === user.email && 'request' in order
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    if (user && user.email) {
      fetchOrders();
    }
  }, [user.email]);

  if (error) {
    return (
      <div className="text-red-500 text-center p-6 bg-gray-800 rounded-lg shadow-md">
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">Your Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="bg-gray-900 border border-gray-700 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="p-6">
                {order.imageurl ? (
                  <img src={order.imageurl} className="w-full h-48 object-cover rounded-md mb-4" alt={order.bookTitle} />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white text-lg rounded-md mb-4">
                    No Image
                  </div>
                )}
                <p className="text-xl font-semibold mb-2 text-white">Order ID: {order._id}</p>
                <p className="text-lg mb-2 text-gray-300">Book Title: {order.bookTitle}</p>
                <p className="text-lg mb-2 text-gray-300">Price: Rs {order.price}</p>
                <p className="text-lg mb-2 text-gray-300">Seller: {order.sellerId}</p>
                <p className="text-lg mb-2">
                  Request Status: 
                  <span className={`font-semibold ${order.request === 'pending' ? 'text-yellow-400' : order.request === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
                    {order.request === 'pending' ? 'Pending' : order.request === 'accepted' ? 'Approved' : 'Not Available'}
                  </span>
                </p>
                <button 
                  onClick={() => handlePayment(order)} 
                  className="bg-gray-700 text-white py-1 px-3 rounded-md border border-gray-600 hover:bg-gray-600 focus:outline-none transition duration-150 ease-in-out"
                >
                  Make Payment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default YourOrders;

