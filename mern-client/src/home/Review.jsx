import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FaStar} from "react-icons/fa6"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.webp"
import { Avatar } from "flowbite-react";



const Review = () => {
    
  return (
    <div className="my-12 px-4 lg:px-24">
        <h2 className="text-center font-bold text-5xl mb-10 leading-snug">Our Customer Reviews</h2>
          <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      
      <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, explicabo quasi enim reprehenderit recusandae reiciendis ea voluptatibus illum tempora. A voluptatem vel nihil quas praesentium? Sapiente tempora maiores sequi culpa?</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7 ">
                "Book Bridge is a haven for bibliophiles! The platform offers a diverse range of books, both vintage and modern, making it easy to find hidden gems. It's user-friendly, with clear descriptions and fair pricing. "</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">
                "The Book Bridge website seamlessly connects book lovers, offering a vast selection of old and new titles. It's intuitive to use, with detailed listings and a smooth buying process. Highly recommended for readers"</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">"Book Bridge is a haven for bibliophiles! The platform offers a diverse range of books, both vintage and modern, making it easy to find hidden gems. It's user-friendly, with clear descriptions and fair pricing."</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                   
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">"Book Bridge is my go-to for book shopping! It offers a wide selection, from classics to niche subjects, all neatly categorized. The seller profiles and customer reviews provide peace of mind, ensuring every purchase is reliable."</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7 ">"Discovering Book Bridge was a game-changer! I found rare editions and contemporary favorites easily. The interface is intuitive, and the seller ratings ensure trustworthy transactions."</p> <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-2xl bg-gray-900 py-8  px-4 md:m-5 rounded-lg ">
            
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">"Book Bridge is a gem for book enthusiasts! The site's design is user-centric, enhancing the browsing and purchasing experience. Selling books is straightforward with prompt customer support."</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
       
      </Swiper>
    </div>
  
  )
}

export default Review