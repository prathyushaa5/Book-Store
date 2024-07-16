import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
  const { _id, bookTitle, imageurl, price, authorname, category, bookDescription } = useLoaderData();

  const handleBuyNow = () => {
    // Placeholder function for handling the buy action
    console.log(`Buy book with ID: ${_id}`);
    // You can add your buy logic here (e.g., redirect to checkout, add to cart, etc.)
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="relative pb-2/3">
          <img
            src={imageurl}
            alt={bookTitle}
            className="h-96"
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4">{bookTitle}</h2>
          <p className="text-xl mb-4">Author: <span className="text-gray-400">{authorname}</span></p>
          <p className="text-xl mb-4">Category: <span className="text-gray-400">{category}</span></p>
          <p className="text-lg text-gray-300 mb-4">{bookDescription}</p>
          <p className=" mb-4">Price: <span className="text-red-600 font-bold">Rs {price}</span></p>
          
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Buy Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
