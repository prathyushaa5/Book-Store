import React from 'react'
import {Link} from 'react-router-dom'
import bookpic from "../assets/bookpic.png"
const PromoBanner = () => {
  return (
    <div className="mt-16 py-12 bg-teal-100 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
      <div className=' md:w-1/2'>
            <h2 className='text-4xl text-black font-bold mb-6 leading-snug'>2023 National Book Awads for fiction Shortlist</h2>

        <Link to="/shop"><button className='bg-blue-700 text-white font-semibold px-5 py-2 mt-3 rounded hover:bg-black transition-all duration-300'>Get promo code</button></Link>
        </div>
        <div>
          <img  className="w-52 h-52 "src={bookpic} alt="" />
        </div>
      </div>
      
    </div>
  )
}

export default PromoBanner