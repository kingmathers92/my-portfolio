import React, { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Youtube() {
  const [videos, setVideos] = useState([]);
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.REACT_APP_CHANNEL_ID}&maxResults=4&order=date&key=${process.env.REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          console.error(
            "Error fetching video data. Response status:",
            response.status
          );
          console.error("Response text:", await response.text());
          return;
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          // Exclude shorts
          const filteredVideos = data.items.filter(
            (video) => video.snippet && video.snippet.title.length >= 40
          );
          setVideos(filteredVideos);
        } else {
          console.error("No videos found in response!");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = Math.min(sliderRef.current.clientWidth, 500);
      setSliderPosition((prevPosition) => prevPosition - scrollAmount);
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const scrollAmount = Math.min(sliderRef.current.clientWidth, 500);
      setSliderPosition((prevPosition) => prevPosition + scrollAmount);
    }
  };

  return (
    <div name="youtube" className="w-full md:h-screen">
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Youtube
          </p>
        </div>
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            ref={sliderRef}
            style={{ transofrm: `translateX(-${sliderPosition}px)` }}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {videos.map((video) => {
              const { id } = video;
              return (
                <div
                  key={id.videoId}
                  className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                >
                  <iframe
                    className="video"
                    title="Youtube player"
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation allowFullScreen"
                    src={`https://youtube.com/embed/${id.videoId}?autoplay=0`}
                  ></iframe>
                </div>
              );
            })}
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
