import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Robots() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    fetch("https://botsdb.onrender.com/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  const renderBots = bots.map((bot) => (
    <div key={bot.id} className="card m-2">
      <img src={bot.avatar_url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{bot.name}</h5>
        <p className="card-text">{bot.catchphrase}</p>
        <Link to={`/description/${bot.id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  ));

  function filter(event) {
    const text = event.target.value;
    if (text.length > 0) {
      const filtered = bots.filter((bot) =>
        bot.bot_class.toLowerCase().includes(text.toLowerCase())
      );
      setBots(filtered);
    } else {
      fetch("https://botsdb.onrender.com/bots")
        .then((res) => res.json())
        .then((data) => setBots(data));
    }
  }


  return (
    <>
      <div className="col-sm-10 m-2 mx-auto">
        <input
          onChange={filter}
          type="text"
          className="form-control"
          id="inputPassword"
          placeholder="Filter by class..."
        />
      </div>
      <div className="card-container mx-auto">{renderBots}</div>
    </>
  );
}

export default Robots;