import React, { useState, useEffect, useContext } from 'react';
import { FaCreditCard, FaMoneyBillAlt, FaPaypal } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider'; // Adjust the path as needed
import { useLoaderData } from 'react-router-dom'; // Adjust the path to your custom hook or data loader

const CheckoutPage = () => {
  const { _id } = useLoaderData();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [book, setBook] = useState({
    _id: '',
    bookTitle: '',
    price: 0,
    imageurl: '',
    authorname: '',
    userId: '',
    bookId: ''
  });
  const [formData, setFormData] = useState({
    bookId: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    paymentOption: 'cashOnDelivery',
    userId: '',
    sellerId: '',
    bookTitle: '',
    price: '',
    authorname: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch book details based on _id
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/book/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook({
          _id: data._id,
          bookTitle: data.bookTitle,
          price: data.price,
          imageurl: data.imageurl,
          authorname: data.authorname,
          userId: data.userId,
          bookId: data._id
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Failed to fetch book details. Please try again later.');
      }
    };

    if (_id) {
      fetchBookDetails();
    }
  }, [_id]);

  // Handle input change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Submit the order
      const response = await fetch('http://localhost:5000/upload-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user ? user.email : '',
          bookTitle: book.bookTitle,
          price: book.price,
          authorname: book.authorname,
          sellerId: book.userId,
          imageurl: book.imageurl,
          request: "pending",
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          bookId: book.bookId
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to upload order');
      }

      await sendEmailNotification();

      // If both requests are successful, set submitted to true
      setSubmitted(true);
      setMessage(orderData.message);

    } catch (error) {
      console.error('Error placing order:', error.message);
      setMessage('Failed to place order');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to send email notification
  const sendEmailNotification = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId: book.userId,
          userId: user.email,
          bookTitle: book.bookTitle,
          bookId: book._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email notification');
      }

      console.log('Email notification sent successfully:', data.message);
    } catch (error) {
      console.error('Error sending email notification:', error.message);
    }
  };

  // Display confirmation message after successful form submission
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-8">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center w-full max-w-md">
          <p className="text-green-400 text-xl font-semibold mb-4">Request Sent Successfully!</p>
          <div className="bg-gray-900 border-t-4 border-green-400 rounded-lg p-4 text-center">
            <p className="text-white text-lg font-semibold mb-2">Book Title: {book.bookTitle}</p>
            <p className="text-white text-lg font-semibold mb-4">Price: Rs {book.price}</p>
            <p className="text-white text-sm mb-4">Thank you for ordering. We will process your request shortly.</p>
            <Link to="/shop">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Return to Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black py-8">
      <div className="max-w-4xl w-full bg-black border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Left side: Book details */}
        <div className="w-full md:w-1/2 bg-black p-4 border border-gray-600 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-center mb-4 text-white">Book Details</h2>
          <img src={book.imageurl} className="h-72 m-auto object-cover rounded-t-lg" alt={book.bookTitle} />
          <div className="p-4">
            <p className="text-lg font-semibold mb-2 text-white">Book Title: {book.bookTitle}</p>
            <p className="text-lg font-semibold mb-2 text-white">Price: Rs {book.price}</p>
            <p className="text-lg font-semibold mb-2 text-white">Author: {book.authorname}</p>
            <p className="text-lg font-semibold mb-2 text-white">Seller Id: {book.userId}</p>
            {/* Add more book details here */}
          </div>
        </div>

        {/* Right side: Checkout form */}
        <div className="w-full md:w-1/2 bg-black border border-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4 text-white">Checkout</h2>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 016.54-7.904A6.978 6.978 0 0112 4a7 7 0 01.46 13.22A8 8 0 014 12z"></path>
              </svg>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm resize-none"
                  rows="4"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="bookId" className="block text-sm font-medium text-white">Book Id</label>
                <input
                  type="text"
                  id="bookId"
                  name="bookId"
                  value={book.bookId}
                  readOnly
                  required
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="bookTitle" className="block text-sm font-medium text-white">Book Title</label>
                <input
                  type="text"
                  id="bookTitle"
                  name="bookTitle"
                  value={book.bookTitle}
                  readOnly
                  required
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="sellerId" className="block text-sm font-medium text-white">Seller Id</label>
                <input
                  type="text"
                  id="sellerId"
                  name="sellerId"
                  value={book.userId}
                  readOnly
                  required
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1 text-white text-sm"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Payment Information</h3>
                <label htmlFor="paymentOption" className="block text-sm font-medium text-white">Payment Option</label>
                <div className="flex items-center gap-4">
                  <select
                    id="paymentOption"
                    name="paymentOption"
                    value={formData.paymentOption}
                    onChange={handleChange}
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="cashOnDelivery">Cash on Delivery</option>
                    <option value="upi">UPI</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                  <div className="text-xl text-white">
                    {formData.paymentOption === 'cashOnDelivery' ? (
                      <FaMoneyBillAlt />
                    ) : formData.paymentOption === 'upi' || formData.paymentOption === 'creditCard' ? (
                      <FaCreditCard />
                    ) : (
                      <FaPaypal />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 w-full"
              >
                Place Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
