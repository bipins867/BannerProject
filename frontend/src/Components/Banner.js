import React, { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  const [bannerData, setBannerData] = useState({
    isVisible: false,
    description: "",
    timer: 0,
    link: "",
  });
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/banner")
      .then((response) => {
        if (response.data.length > 0) {
          setBannerData(response.data[0]);
          setTimeLeft(response.data[0].timer);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the banner data!", error);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      console.log("Timer:", timeLeft);
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && bannerData.isVisible) {
      console.log("Hiding banner");
      setBannerData((prevData) => ({
        ...prevData,
        isVisible: false,
      }));
    }
  }, [timeLeft, bannerData.isVisible]);

  if (!bannerData.isVisible) {
    return null;
  }

  return (
    <div className="banner">
      <p>{bannerData.description}</p>
      <p>Time left: {timeLeft}s</p>
      <a href={bannerData.link}>Click here</a>
    </div>
  );
}

export default Banner;
