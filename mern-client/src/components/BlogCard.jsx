import React from 'react';

const BlogCard = ({ post }) => {
  return (
    <a href={post.href} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div>
        <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 mb-4">By {post.author} | {post.date}</p>
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </a>
  );
}

export default BlogCard;
