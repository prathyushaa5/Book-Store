// src/components/BlogPage.js

import React from 'react';
import BlogCard from './BlogCard';

const Blog = () => {
  // Sample blog post data (replace with actual data or fetch from an API)
  const blogPosts = [
    {
      id: 1,
      title: 'Book Review: "The Alchemist" by Paulo Coelho',
      author: 'John Doe',
      date: 'July 14, 2024',
      image: 'https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg',
      content: `In this review, we explore the timeless wisdom of "The Alchemist" by Paulo Coelho, a journey of self-discovery and following one's dreams. Dive into the narrative and themes that have captivated readers worldwide.`,
      href:"https://medium.com/@faithnyawira/book-review-the-alchemist-by-paulo-coelho-d3a69abb1f53"
    },
    {
      id: 2,
      title: 'Author Spotlight: J.K. Rowling',
      author: 'Jane Smith',
      date: 'July 12, 2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25aHmuql6-HLkPrbuqWFjakrernWejwE8LQ&s',
      content: `Learn more about the life and works of J.K. Rowling, the renowned author behind the Harry Potter series and other acclaimed novels. Discover her writing journey and impact on literature.`,
      href:"https://www.britannica.com/biography/J-K-Rowling"
    },
    {
      id: 3,
      title: 'Exploring Classic Literature: Must-Read Books',
      author: 'Emily Johnson',
      date: 'August 3, 2024',
      image: 'https://m.media-amazon.com/images/I/71DVDgwLPRL._AC_UF1000,1000_QL80_.jpg',
      content: `Dive into the world of classic literature with this curated list of must-read books. From timeless novels like "Pride and Prejudice" to epic tales such as "Moby Dick," discover why these classics continue to captivate readers across generations.`,
      href:"https://www.panmacmillan.com/blogs/classics/classic-books-to-read-before-you-die"
    },
    {
      id: 4,
      title: 'Interview with Bestselling Author: Insights into Writing Process',
      author: 'Michael Brown',
      date: 'August 10, 2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdCoHiZ-NM0Ty1S5_dvT8p-7Lwhui6IVuKw&s',
      content: `Gain valuable insights into the writing process from a bestselling author. In this exclusive interview, the author shares tips on crafting compelling stories, overcoming writer's block, and navigating the publishing industry.`,
      href:"https://iconsmediapublishing.com/interview-with-a-best-selling-author-insights-into-the-writing-process/"
    },
    {
      id: 5,
      title: 'Book Review: "Where the Crawdads Sing" by Delia Owens',
      author: 'Sarah Lee',
      date: 'August 17, 2024',
      image: 'https://westvanlibrary.ca/wp-content/uploads/2020/12/book-club-packages-authors-and-book-jackets15-1024x634.jpg',
      content: `Explore the enchanting world of "Where the Crawdads Sing" by Delia Owens. This review delves into the novel's themes of nature, survival, and human connection, making it a must-read for book enthusiasts.`,
      href: "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwi_psbG26mHAxW3pWYCHffaD7oYABAAGgJzbQ&ase=2&gclid=Cj0KCQjwkdO0BhDxARIsANkNcrf7-ndxGrch6CWBveJd5KrjsRUh-8LxTSAUcUVwTIbhc6oEyLWifRQaApt2EALw_wcB&ohost=www.google.com&cid=CAESVuD2r_H0cj3B3DsLGyNR6lRtXxFB05AuqB95SrKRs9P_rNStXyXUUf7aywSro9uBmqdesszdWUPvTy5OmGM4bdtXn2t-KBSWp-zXc79esHB7oe7xeh3G&sig=AOD64_0esrYC1pvc2xxDdSItrFl3iIIeUw&q&nis=4&adurl&ved=2ahUKEwiN4L_G26mHAxVeZWwGHQFRCQ0Q0Qx6BAgJEAE"
    },
    {
      id: 6,
      title: 'Young Adult Fiction Spotlight: Top Picks for Teens',
      author: 'James Smith',
      date: 'August 24, 2024',
      image: 'https://i.insider.com/6095a4d834af8d001859c22a?width=1136&format=jpeg',
      content: `Discover the hottest young adult fiction books that are captivating teen readers. From thrilling dystopian adventures to heartfelt coming-of-age stories, these picks are`,
      href:"https://www.ala.org/yalsa/2021-best-fiction-young-adults"
    },{
      id: 7,
      title: 'Exploring Classic Literature: Timeless Tales Revisited',
      author: 'Emily Brown',
      date: 'September 12, 2024',
      image: 'https://static.tnn.in/thumb/msid-111343205,thumbsize-1739364,width-1280,height-720,resizemode-75/111343205.jpg?quality=100',
      content: `Delve into the world of classic literature with these timeless tales that continue to resonate with readers across generations.`,
      href: 'https://fastercapital.com/content/Classic-Literature--Classic-Literature-Gems--A-Throwback-to-Timeless-Tales.html'
    }
,{
  id: 8,
  title: 'Fantasy Fiction Gems: Journey into Magical Realms',
  author: 'Sarah Johnson',
  date: 'October 5, 2024',
  image: 'https://miro.medium.com/v2/resize:fit:1024/0*FsDTLRX1bJOHE8O0.png',
  content: `Embark on an enchanting journey with these fantasy fiction novels that transport readers to mystical realms filled with magic and adventure.`,
  href: 'https://medium.com/@lostinambience/exploring-hidden-gems-in-fantasy-in-2024-a-journey-beyond-the-bestsellers-816d35a62faf'
}
,{
  id: 9,
  title: 'Poetry Picks: Inspiring Verses for Every Mood',
  author: 'David Wilson',
  date: 'November 18, 2024',
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9O8z4Hon1FBBePbjOo48JDaUqkmZX-Tlvw&s",
  content: `Explore a collection of poetry that captures a range of emotions and experiences, offering readers moments of reflection and inspiration.`,
  href: 'https://www.theguardian.com/books/2022/nov/26/that-orange-it-made-me-so-happy-50-poems-to-boost-your-mood'
}
,{
  id: 11,
  title: 'Sci-Fi Spectacular: Top Science Fiction Reads of the Year',
  author: 'Michael Adams',
  date: 'January 9, 2025',
  image: 'https://ik.imagekit.io/panmac/tr:f-auto,w-740,pr-true//bcd02f72-b50c-0179-8b4b-5e44f5340bd4/2263816f-36c1-432b-9a00-b4ce89dc27b1/Best-sci-fi-books%20copy.webp',
  content: `Discover the best science fiction books of the year that push the boundaries of imagination and explore futuristic concepts.`,
  href: 'https://www.esquire.com/entertainment/books/g39358054/best-sci-fi-books/'
}
,{
  id: 12,
  title: 'Thrilling Mystery Novels: Whodunits and Suspenseful Stories',
  author: 'Rachel Carter',
  date: 'February 21, 2025',
  image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-04/9/20/enhanced/5576541cf926/original-828-1586462713-8.jpg?crop=1200:630;0,0%26downsize=1250:*',
  content: `Uncover gripping mysteries and suspenseful plots with these thrilling novels that keep readers on the edge of their seats until the very end.`,
  href: 'https://therealbookspy.com/2024/01/31/20-modern-whodunits-to-read-if-you-love-golden-age-mysteries/'
}
    
    // Add more blog posts as needed
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mt-20 text-white mb-8">Explore Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render blog cards */}
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post}  />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
