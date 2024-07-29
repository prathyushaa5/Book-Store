import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider'; // Ensure this path is correct

const YourOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        // Filter orders where user.email matches user.email and the request field is present
        const filteredOrders = data.filter(order => 
          order.userId === user.email && 'request' in order
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    if (user && user.email) { // Ensure user and user.email are defined before fetching
      fetchOrders();
    }
  }, [user.email]); // Trigger fetchOrders whenever user.email changes

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
