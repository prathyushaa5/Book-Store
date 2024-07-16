import React from 'react';
import FavBook from "../assets/favbook.webp";
import {Link} from 'react-router-dom'
const FavBooks = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex  flex-col md:flex-row justify-between items-center gap-12' style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className='md:w-1/2'>
        <img src={FavBook} alt=" " className="rounded md:w-10/12"/>
      </div>
      <div className='md:w-1/2 space-y-6'>
        <h2 className='text-5xl font-bold my-5 md:w-3/4'>Find Your Favourite <span className='text-blue-700'>Book here!</span></h2>
        <p className='mb-10 text-lg md:w-5/6'>Discover your favorite book here! Explore diverse genres, from classics to new releases. Our platform connects you with curated listings, ensuring you find the perfect read to enjoy and cherish</p>
      
        <div className='flex flex-col sm:flex-row justify-between gap-3 md:w-3/4 my-14'>
          <div>
            <h3 className ='text-3xl font-bold'>100+</h3>
            <p className='text-base'>Register Users</p>
          </div>
          <div>
            <h3 className ='text-3xl font-bold'>1000+</h3>
            <p className='text-base'>Purchases </p>
          </div>
          <div>
            <h3 className ='text-3xl font-bold'>900+</h3>
            <p className='text-base'>Book Listing</p>
          </div>
        </div>
        <Link to="/shop"><button className='bg-blue-700 text-white font-semibold px-5 py-2 mt-3 rounded hover:bg-black transition-all duration-300'>Explore</button></Link>
      </div>
     
    </div>
  );
};

export default FavBooks;
