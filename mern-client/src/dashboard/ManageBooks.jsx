import React, { useState, useEffect, useContext } from 'react';
import { Table } from "flowbite-react"; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

const ManageBooks = () => {
  const { user } = useContext(AuthContext);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/all-books")
        .then(res => res.json())
        .then(data => {
          // Filter books based on logged-in user's userId
          const filteredBooks = data.filter(book => book.userId === user.email);
          setUserBooks(filteredBooks);
        })
        .catch(error => console.error('Error fetching books:', error));
    }
  }, [user]);

  const handleDelete = (id) => {
    console.log('Delete book with ID:', id);
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       // Assuming you have a token-based auth
      },
    })
      .then(res => res.json())
      .then(() => {
        alert('Book deleted successfully');
        // Remove the deleted book from the state
        setUserBooks(prevBooks => prevBooks.filter(book => book._id == book.userId));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="my-12 px-4 text-white bg-gray-1000">
      <h2 className='mb-8 text-3xl font-bold '>Manage Your Books</h2>
      <div className="overflow-x-auto text-white bg-black">
        <Table className="lg_w-[1180px]">
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Author Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Prices</Table.HeadCell>
            <Table.HeadCell>
              <span>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          {userBooks.map((book, index) => (
            <Table.Body key={book._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{book.bookTitle}</Table.Cell>
                <Table.Cell>{book.authorname}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>Rs {book.price}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/dashboard/editbooks/${book._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 ml-4 px-4 py-1 font-semibold text-white rounded-lg"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ManageBooks;
