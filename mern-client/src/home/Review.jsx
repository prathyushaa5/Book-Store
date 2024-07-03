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
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      
        <SwiperSlide>
            
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
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-12 h-12 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                  
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, explicabo quasi enim reprehenderit recusandae reiciendis ea voluptatibus illum tempora. A voluptatem vel nihil quas praesentium? Sapiente tempora maiores sequi culpa?</p>
                    <Avatar img={profile2} alt="avatar of Jese" rounded  className="w-12 h-12 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Swathi Mishra</h5>
                    <p className="text-base ">Senior Manager at Merylyn</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            
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
        <SwiperSlide>
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
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
        <SwiperSlide>
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
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
        <SwiperSlide>
            
            <div className="m-4">
                <div className=' text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div>
                <p className="mt-7 ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, explicabo quasi enim reprehenderit recusandae reiciendis ea voluptatibus illum tempora. A voluptatem vel nihil quas praesentium? Sapiente tempora maiores sequi culpa?</p>
                    <Avatar img={profile1} alt="avatar of Jese" rounded  className="w-10 mt-7 mt-7 mb-4"/>
                    <h5 className="text-base font-medium ">Jayn Mathews</h5>
                    <p className="text-base ">Educator</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            
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
       
      </Swiper>
    </div>
  
  )
}

export default Review