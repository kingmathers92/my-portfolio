import React, { useState } from "react";
import Pagination from "./Pagination.jsx";
import { blogData } from "../data/BlogData.js";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const sortedPosts = blogData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div name="blog" className="w-full md:h-screen mt-20">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Blog
          </p>
          <p className="py-6">// Check out some of my recent articles</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg group h-auto mx-auto m-2 p-2"
            >
              <img src={post.image} alt="post" />
              <a href={post.link} target="_blank" rel="noreferrer">
                <p className="title text-xl mt-4 text-blue-300 brightness-150">
                  {post.title}
                </p>
                <br />
                <div>
                  <p className="text-sm font-light">{post.description}</p>
                </div>
              </a>
              <div className="flex items-center right-0 bottom-0">
                <img
                  src="https://imgtr.ee/images/2023/07/11/7f7acf0d9b774998003fcb6a7ed35fce.png"
                  className="rounded-full w-12 h-12 my-2"
                  alt="face"
                />
                <p className="mx-3">
                  <span className="time text-gray-200 text-sm">
                    {post.time}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Blog;
