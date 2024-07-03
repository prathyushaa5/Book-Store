import React from 'react';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-black text-white flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
      <div>
          <BannerCard />
        </div>
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold'>
            Buy and Sell Your Books{' '}
            <span className='text-blue-200'>for the Best Prices</span>
          </h2>
          <p className='md:w-4/5'>
          Welcome to our book marketplace where you can discover a world of literary treasures waiting to be bought and sold. Whether you're a book lover looking to expand your collection or an avid reader ready to pass on your favorites, our platform offers a seamless experience to connect buyers and sellers.<br></br>
          Explore thousands of titles across genres, from timeless classics to the latest bestsellers. Sell your gently used books effortlessly and find new homes for your beloved stories. Browse through listings curated by fellow book enthusiasts and discover hidden gems that match your interests.
          </p>
          <div>
            <input
              type='search'
              name='search'
              placeholder='Search a Book'
              className='py-2 px-2 rounded-sm text-blue outline-none border border-gray-300 text-white'
            />
            <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-blue-900 transition-all ease-in duration-200 ml-2'>
              Search
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Banner;
