import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { useParams } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams(); // Assuming you're using React Router to get book ID from URL params
  const bookcategories = ["Fiction", "Non-Fiction", "Mystery", "Programming", "Science", "Fantasy", "Historical", "Bibliography", "Autobiography", "History", "Self-help", "Education", "Business", "Children Books", "Travel", "Magazines", "Religious", "Art and Design"];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookcategories[0]);
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  useEffect(() => {
    // Fetch the book details based on ID (if required)
    fetchBookDetails(id);
  }, [id]);

  const fetchBookDetails = (id) => {
    // Example fetch to get book details based on ID
    fetch(`http://localhost:5000/book/${id}`)
      .then(res => res.json())
      .then(data => {
        setBookTitle(data.bookTitle);
        setAuthorName(data.authorname);
        setImageURL(data.imageurl);
        setSelectedBookCategory(data.category);
        setPrice(data.price);
        setBookDescription(data.bookDescription);
        setUserId(data.userId);
      })
      .catch(error => console.error('Error fetching book details:', error));
  };

  const handleBookUpdate = (event) => {
    event.preventDefault();
    const updatedBookObj = {
      bookTitle,
      authorname: authorName,
      imageurl: imageURL,
      category: selectedBookCategory,
      price,
      bookDescription,
      userId // Ensure userId is included in the update object
    };

    console.log("Book Object:", updatedBookObj);

    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedBookObj)
    })
      .then(res => res.json())
      .then(data => {
        alert("Book updated successfully");
      })
      .catch(error => {
        console.error('Error updating book:', error);
        alert("Failed to update book. Please try again.");
      });
  };

  return (
    <div className="mt-12 px-4 text-white bg-gray-1000">
      <h2 className='mb-8 text-3xl font-bold'>Update a Book</h2>
      <form className="flex lg:w-[1180px] flex-col gap-4 text-white bg-black" onSubmit={handleBookUpdate}>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Enter book title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name="authorName" type="text" placeholder="Enter Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name="imageURL" type="text" placeholder="Enter Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="category" value="Category" />
            </div>
            <Select id='category' name="category" className="w-full rounded" value={selectedBookCategory} onChange={(e) => setSelectedBookCategory(e.target.value)}>
              {bookcategories.map(option => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="price" value="Book Price" />
            </div>
            <TextInput id="price" name="price" type="text" placeholder="Enter Book Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label className="text-white bg-black" htmlFor="userId" value="User Id(Mail)" />
            </div>
            <TextInput id="userId" name="userId" type="text" placeholder="Enter Book Price" value={userId} readOnly />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label className="text-white bg-black" htmlFor="bookDescription" value="Book Description (30 words maximum)" />
          </div>
          <Textarea id="bookDescription" name="bookDescription" placeholder="Leave a comment..." value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} required rows={4} />
        </div>
        <Button type="submit">Update Book</Button>
      </form>
    </div>
  );
};

export default EditBooks;
