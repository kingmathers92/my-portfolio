import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination.jsx";

function Blog({ username }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    const username = "@khaledb.yahya";
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`;
    axios
      .get(url)
      .then((response) => {
        const posts = response.data.items;
        setPosts(posts);
        setPostsPerPage(posts.length);
        console.log(posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  const stripTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "").replace(/Photo\s.*\sUnsplash/, "");
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div name="blog" className="w-full md:h-screen py-16">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Blog
          </p>
          <p className="py-6">// Check out some of my recent articles</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPosts.map((post) => (
            <div
              key={post.guid}
              className="rounded-lg group container mx-auto shadow-sm shadow-blue-300 m-2 p-2"
            >
              <img src={post.thumbnail} alt="post" />
              <a href={post.link} target="_blank" rel="noreferrer">
                <p className="text-xl mt-4 text-blue-300 brightness-150">
                  {post.title}
                </p>
                <br />
                <p className="text-sm font-light">
                  {stripTags(post.description).slice(0, 250)}
                  {stripTags(post.description).length > 250 ? "..." : ""}
                </p>
              </a>
              <div className="flex items-center mt-4">
                <img
                  src="https://imgtr.ee/images/2023/03/21/q3GYx.th.jpg"
                  className="rounded-full w-12 h-12 my-2"
                  alt="face"
                />
                <p className="mx-2 flex flex-col-reverse ml-40">
                  <span className="text-gray-200 text-sm">
                    {new Date(post.pubDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default Blog;
