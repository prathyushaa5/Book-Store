import React from 'react';
import bookstore from "../assets/bookstore.jpeg";

const BannerCard = () => {
  return (
    <div className='banner'>
      {/* Adjust image size */}
      <img src={bookstore} className="w-100 rounded-full h-auto mx-auto  mt-0  " alt="Bookstore" />
    </div>
  );
};

export default BannerCard;
