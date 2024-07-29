import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books and filter based on the 'ordered' field
  const fetchAndFilterBooks = async () => {
    try {
      // Fetch books
      const response = await fetch('http://localhost:5000/all-books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();

      // Filter books where 'ordered' field is not present
      const availableBooks = data.filter(book => !book.ordered);

      // Only take the first 6 books
      setFilteredBooks(availableBooks.slice(0, 6));
      
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchAndFilterBooks();
  }, []);

  return (
    <div>
      <BookCards books={filteredBooks} headLine="Best Seller Books" />
    </div>
  );
};

export default BestSellerBooks;
