import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CheckoutPage from './Checkout';
const SingleBook = () => {
  const { _id, bookTitle, imageurl, price, authorname, category, bookDescription, userId } = useLoaderData();


  return (
    <div className="bg-gray-1000 text-white min-h-screen flex flex-col">
      <Link to="/shop">
        <button className="flex items-center text-gray-300 hover:text-white py-2 px-4 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out mt-20 ml-4 self-start">
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </Link>

      <div className="max-w-3xl w-full mx-auto rounded-lg overflow-hidden shadow-lg flex mt-20">
        <div className="flex-1">
          <img
            src={imageurl}
            alt={bookTitle}
            className="w-full h-auto object-cover border-0"
          />
        </div>
        <div className="flex-1 p-6 ">
          <h2 className="text-5xl font-bold mb-4">{bookTitle}</h2>
          <p className="text-xl mb-4">Author: <span className="text-gray-400">{authorname}</span></p>
          <p className="text-xl mb-4">Category: <span className="text-gray-400">{category}</span></p>
          <p className="text-lg text-gray-300 mb-4">{bookDescription}</p>
          <p className="mb-4 text-xl ">Price: <span className="text-red-600 font-bold">Rs {price}</span></p>
          <p className="mb-4">Seller: <span className="text-gray-400">{userId}</span></p>
          
         <Link to ={`/checkout/${_id}`}><button
           
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out w-full"
          >
            Buy Now
          </button></Link> 
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
