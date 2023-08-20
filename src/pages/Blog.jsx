import React, { useState } from "react";
import { Pagination } from "../components/index";
import { blogData } from "../data/BlogData.js";
import face from "../assets/face-min.png";

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

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div name="blog" className="w-full md:h-screen pt-20">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Blog
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 font-semibold">
          {currentPosts.map((post, index) => (
            <div key={index} className="rounded-lg group p-3">
              <a href={post.link} target="_blank" rel="noreferrer">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="title text-sm mt-4 text-blue-300 brightness-150">
                  {post.title}
                </p>
                <br />
                <div className="mt-6 overflow-hidden">
                  <p className="text-sm">
                    {truncateText(post.description, 24)}
                  </p>
                </div>
                <div className="flex items-center right-0 mt-8">
                  <img
                    src={face}
                    className="rounded-full w-12 h-12 my-2"
                    alt="face"
                  />
                  <p className="mx-3">
                    <span className="time text-gray-200 text-sm">
                      {post.time}
                    </span>
                  </p>
                </div>
              </a>
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
