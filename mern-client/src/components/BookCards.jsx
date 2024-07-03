// BookCards.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import 'swiper/css'; // Import Swiper base styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import { Pagination } from 'swiper/modules'; // Import Swiper pagination module
import "./style.css"
const BookCards = ({ headLine, books }) => {
  console.log(books);
  return (
    <div className="mt-12 my-16 px-4 lg:px-24 book-cards-container">
      <h2 className="text-5xl text-center font-bold my-5">{headLine}</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 5, spaceBetween: 50 },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
       
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <Link to={`/book/${book._id}`}>
              <div className="relative">
                <img className="hover:opacity-50" src={book.imageurl} alt={book.bookTitle} />

                <div className="absolute top-3 right-3 bg-blue-600 text-white hover:bg-white hover:text-blue-600 p-2 rounded">
                  <FaCartShopping className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h3>{book.bookTitle}</h3>
                <p>{book.authorname}</p>
                <p>Rs{book.price}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCards;
