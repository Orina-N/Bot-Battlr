import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Robots() {
  // State to hold the list of robots
  const [bots, setBots] = useState([]);

  // Fetch the list of robots when the component mounts
  useEffect(() => {
    fetch("https://botsdb.onrender.com/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  // Render each robot as a card
  const renderBots = bots.map((bot) => (
    <div key={bot.id} className="card m-2">
      <img src={bot.avatar_url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{bot.name}</h5>
        <p className="card-text">{bot.catchphrase}</p>
        {/* Link to the description page of each robot */}
        <Link to={`/description/${bot.id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  ));

  // Function to filter the robots based on class
  function filter(event) {
    const text = event.target.value;
    if (text.length > 0) {
      // Filter the robots whose class matches the input text
      const filtered = bots.filter((bot) =>
        bot.bot_class.toLowerCase().includes(text.toLowerCase())
      );
      setBots(filtered); // Update the state with filtered robots
    } else {
      // Fetch the original list of robots when the input is empty
      fetch("https://botsdb.onrender.com/bots")
        .then((res) => res.json())
        .then((data) => setBots(data));
    }
  }

  return (
    <>
      {/* Input field for filtering */}
      <div className="col-sm-10 m-2 mx-auto">
        <input
          onChange={filter}
          type="text"
          className="form-control"
          id="inputPassword"
          placeholder="Filter by class..."
        />
      </div>
      {/* Container for rendering the cards */}
      <div className="card-container mx-auto">{renderBots}</div>
    </>
  );
}

export default Robots;
