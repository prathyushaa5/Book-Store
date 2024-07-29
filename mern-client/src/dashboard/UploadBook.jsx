import React, { useState, useContext } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { AuthContext } from '../contects/AuthProvider';

const UploadBook = () => {
  const { user } = useContext(AuthContext);
  const [selectedBookCategory, setSelectedBookCategory] = useState('Fiction');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const bookcategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science", "Fantasy", "Historical",
    "Bibliography", "Autobiography", "History", "Self-help", "Education", "Business",
    "Children Books", "Travel", "Magazines", "Religious", "Art and Design"
  ];

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('bookTitle', event.target.bookTitle.value);
    formData.append('authorname', event.target.authorname.value);
    formData.append('category', selectedBookCategory);
    formData.append('price', event.target.price.value);
    formData.append('bookDescription', event.target.bookDescription.value);
    formData.append('userId', user.email); // Seller's email (userId)
    formData.append('imageFile', selectedImage);

    try {
      // Upload book details to backend
      const response = await fetch('http://localhost:5000/upload-book', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload book');
      }

      const data = await response.json();
      console.log('Book uploaded successfully:', data.book);

      // After book upload, you can redirect to payment page or handle payment initiation here

      // Example: Redirect to payment page
      // window.location.href = `/payment?bookId=${data.book._id}`;

      // Clear form and reset state
      event.target.reset();
      setSelectedImage(null);
      setErrorMessage('');
      alert('Book uploaded successfully');
    } catch (error) {
      console.error('Error uploading book:', error);
      setErrorMessage('Failed to upload book. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="mt-12 px-4 text-white bg-gray-1000">
        <h2 className='mb-8 text-3xl font-bold '>Upload A Book</h2>
        <p>Please log in to upload a book.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 text-white bg-gray-1000">
      <h2 className='mb-8 text-3xl font-bold '>Upload A Book</h2>
      <form className="flex lg:w-[1180px] flex-col gap-4 text-white bg-black" onSubmit={handleBookSubmit} encType="multipart/form-data">
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" className="text-white" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Enter book title" required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorname" className="text-white" value="Author Name" />
            </div>
            <TextInput id="authorname" name="authorname" type="text" placeholder="Enter Author Name" required />
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageFile" className="text-white" value="Upload Image" />
            </div>
            <input id="imageFile" name="imageFile" type="file" onChange={handleImageChange} accept="image/*" required />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="category" className="text-white" value="Category" />
            </div>
            <Select id='category' name="category" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookcategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" className="text-white" value="Book Price" />
            </div>
            <TextInput id="price" name="price" type="text" placeholder="Enter Book Price" required />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" className="text-white" value="Book Description (30 words maximum)" />
          </div>
          <Textarea id="bookDescription" name="bookDescription" placeholder="Leave a comment..." required rows={4} />
        </div>
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="userId" className="text-white" value="User ID" />
            </div>
            <TextInput id="userId" name="userId" type="text" placeholder="Enter userId(Mail Id)" value={user.email} readOnly required />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit">Upload Book</Button>
      </form>
    </div>
  );
};

export default UploadBook;
