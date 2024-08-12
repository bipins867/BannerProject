import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch initial banner data from the server
    axios
      .get("http://localhost:3001/api/banner")
      .then((response) => {
        if (response.data.length > 0) {
          const bannerData = response.data[0];
          setDescription(bannerData.description);
          setTimer(bannerData.timer);
          setLink(bannerData.link);
          setIsVisible(bannerData.isVisible);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the banner data!", error);
      });
  }, []);

  const handleSave = () => {
    const bannerData = { description, timer, link, isVisible };
    axios
      .post("http://localhost:3001/api/banner", bannerData)
      .then((response) => {
        console.log("Banner data saved successfully!");
      })
      .catch((error) => {
        console.error("There was an error saving the banner data!", error);
      });
  };

  return (
    <div className="dashboard">
      <label>
        Banner Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Timer (seconds):
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
        />
      </label>
      <label>
        Banner Link:
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <label>
        Show Banner:
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
        />
      </label>
      <button onClick={handleSave}>Save Banner Settings</button>
    </div>
  );
}

export default Dashboard;
