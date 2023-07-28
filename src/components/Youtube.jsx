import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Youtube() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedVideos = localStorage.getItem("cachedVideos");
        if (cachedVideos) {
          setVideos(JSON.parse(cachedVideos));
        } else {
          const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.REACT_APP_CHANNEL_ID}&maxResults=3&order=date&key=${process.env.REACT_APP_API_KEY}`
          );
          const data = await response.json();
          console.log(data);
          const fetchedVideos = data.items;
          setVideos(fetchedVideos);
          localStorage.setItem("cachedVideos", JSON.stringify(fetchedVideos));
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    const scrollAmount = Math.min(slider.clientWidth, 500);
    slider.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    const scrollAmount = Math.min(slider.clientWidth, 500);
    slider.scrollLeft += scrollAmount;
  };

  return (
    <div name="youtube" className="w-full md:h-screen">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Youtube
          </p>
          <p className="py-6">// Check out some of my recent tutorials</p>
        </div>
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {videos &&
              videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      width="290"
                      height="190"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </a>
                </div>
              ))}
          </div>
          <MdChevronRight
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
    </div>
  );
}

export default Youtube;
