import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Picture1 from "./assets/Picture_1.jpg";
import Picture2 from "./assets/Picture_2.jpg";
import Picture3 from "./assets/Picture_3.jpg";
import Picture4 from "./assets/Picture_4.jpg";
import "./ImageSwiper.css";

const images = [Picture1, Picture2, Picture3, Picture4];

function ImageSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeLogs, setSwipeLogs] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("");

  const handleSwipe = (direction) => {
    setSwipeLogs((prevLogs) => [
      ...prevLogs,
      `Image ${currentIndex + 1} swiped ${direction}`,
    ]);

    setSwipeDirection(direction);

    // Update the current index
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    // Reset swipe direction after animation completes
    const timer = setTimeout(() => {
      setSwipeDirection("");
    }, 300); // Duration matches the CSS animation

    return () => clearTimeout(timer);
  }, [swipeDirection]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onSwipedUp: () => handleSwipe("up"),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <>
      <div className="swipe-logs">
        <h2>Swipe Logs:</h2>
        <ul>
          {swipeLogs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>
      <div {...handlers} className={`image-container ${swipeDirection}`}>
        <div
          className="image-slide"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        ></div>
      </div>
    </>
  );
}

export default ImageSwiper;
