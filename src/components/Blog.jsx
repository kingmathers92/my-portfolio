import React, { useState } from "react";
//import axios from "axios";
import Pagination from "./Pagination.jsx";
import { blogData } from "../data/BlogData.js";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const currentPosts = blogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   const username = "@khaledb.yahya";
  //   const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}}`;
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       const posts = response.data.items;
  //       setPosts(posts);
  //       console.log(posts);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // const stripTags = (html) => {
  //   if (!html) return "";
  //   return html.replace(/<[^>]+>/g, "").replace(/Photo\s.*\sUnsplash/, "");
  // };

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
              className="rounded-lg group h-auto mx-auto shadow-sm shadow-blue-300 m-2 p-2"
            >
              <img src={post.image} alt="post" />
              <a href={post.link} target="_blank" rel="noreferrer">
                <p className="text-xl mt-4 text-blue-300 brightness-150">
                  {post.title}
                </p>
                <br />
                <div>
                  <p className="text-sm font-light">{post.description}</p>
                </div>
              </a>
              <div className="flex items-center right-0 bottom-0">
                <img
                  src="https://imgtr.ee/images/2023/03/22/qgGMU.png"
                  className="rounded-full w-12 h-12 my-2"
                  alt="face"
                />
                <p className="mx-3">
                  <span className="text-gray-200 text-sm">{post.time}</span>
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
