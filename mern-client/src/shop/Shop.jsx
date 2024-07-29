import React, { useEffect, useState, useContext } from 'react';
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

const Shop = () => {
  const { user } = useContext(AuthContext); // Accessing user from AuthContext
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch all books initially
  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        filterBooks(data); // Filter books initially
      });
  }, []);

  // Function to filter books based on search term and user.email
  const filterBooks = (booksData) => {
    const results = booksData.filter(book =>
      book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      book.userId !== user.email && // Filter out books where userId matches user.email
      !book.ordered // Filter out books where ordered is true
    );
    setSearchResults(results);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterBooks(books); // Filter books based on new search term
  };

  // Function to handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterBooks(books); // Filter books based on current search term
  };

  return (
    <div className='mt-28 px-4 lg:px-24 '>
      <h2 className="text-5xl font-bold text-center text-white">All Books are here</h2>

      {/* Search form */}
      <form className="my-4 flex items-center justify-center" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="p-2 rounded-l-md border-2 border-r-0 text-black border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
        >
          Search
        </button>
      </form>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {searchResults.map(book => (
          <Card
            key={book._id} // Ensure each card has a unique key
            className="max-w-sm bg-black rounded-none border-gray-800"
          >
            <img src={book.imageurl} className="h-96" alt="" />
            <div className="p-4">
              <h5 className="text-2xl font-bold tracking-tight text-white mb-2">
                {book.bookTitle}
              </h5>
              <p className="text-white mb-2">Rs {book.price}</p>
              <p className="text-white mb-4">{book.authorname}</p>
              <Link to={`/book/${book._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-300 w-full">
                  Buy Now
                </button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
