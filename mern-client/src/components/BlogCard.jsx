import React from 'react';

const BlogCard = ({ post }) => {
  return (
    <a href={post.href}target='_blank' className="block bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div>
        <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
          <p className="text-sm text-white  mb-4">By {post.author} | {post.date}</p>
          <p className="text-gray-400 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </a>
  );
}

export default BlogCard;
