import React, { useState } from 'react';

const ReviewForm = () => {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/upload-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload review');
      }

      setMessage(data.message);
      // Clear form fields after successful submission
      setRating('');
      setReview('');
      setEmail('');
    } catch (error) {
      console.error('Error uploading review:', error.message);
      setMessage('Failed to upload review');
    }
  };

  const handleRatingChange = (e) => {
    const inputRating = parseInt(e.target.value);

    // Ensure rating is between 1 and 5
    if (inputRating >= 1 && inputRating <= 5) {
      setRating(inputRating.toString());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-1000">
      <div className="w-full lg:w-[800px] px-4 py-8 text-white bg-black rounded-lg shadow-lg">
        <h2 className="mb-8 text-3xl font-bold text-center">Upload Your Review</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div className="lg:w-1/3">
              <div className="mb-2 block">
                <label htmlFor="rating" className="text-white">Rating:</label>
              </div>
              <input
                id="rating"
                type="number"
                className="w-full text-black rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
                value={rating}
                onChange={handleRatingChange}
                min="1"
                max="5"
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="review" className="text-white">Review:</label>
            </div>
            <textarea
              id="review"
              className="w-full text-black rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-white">Email:</label>
            </div>
            <input
              id="email"
              type="email"
              className="w-full text-black rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
          >
            Submit Review
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ReviewForm;
