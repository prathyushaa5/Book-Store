import React, { useRef, useState } from 'react';
// import required modules
import { EffectCards } from 'swiper/modules';
import bookstore from "../assets/bookstore.jpeg"
const BannerCard = () => {
  return (
    <div className='banner'>
         <img src={bookstore} className="rounded-full " alt="" />
      
    </div>
  )
}

export default BannerCard