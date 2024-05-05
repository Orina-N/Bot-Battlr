import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Favorite () {
    // State to hold the list of favorite bots
    const [favorites, setFavorites] = useState([])

    // Fetch the list of favorite bots when the component mounts or when the favorites state changes
    useEffect(()=>{
        fetch("https://botsdb.onrender.com/favorites")
        .then(res => res.json())
        .then(data => setFavorites(data))
    },[favorites])

    // Function to handle deleting a favorite bot
    function handleDelete (id) {
        fetch(`https://botsdb.onrender.com/favorites/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            // Update the state to remove the deleted favorite bot
            setFavorites(wasFavorite => wasFavorite.filter(favorite => favorite.id !== id));
        })
    }

    // Render each favorite bot as a card
    const renderFavorite = favorites.map(favorite => {
        return (
            <div key={favorite.id} className="card m-2" >
               <img src={favorite.avatar_url} className="card-img-top" alt="..."/>
               <div className="card-body">
                  <h5 className="card-title">{favorite.name}</h5>
                  <p className="card-text">{favorite.catchphrase}</p>
                  {/* Link to the description page of each favorite bot */}
                  <Link to={`/description/${favorite.id}`} className="btn btn-primary">view</Link>
                  {/* Button to delete the favorite bot */}
                  <button onClick={() => handleDelete(favorite.id)} className="btn btn-danger">Delete</button>
               </div>
            </div>
        )
    })

    // Render the list of favorite bots
    return(
        <div className="favorites-carrier">
          {renderFavorite}
        </div>
    )
}

export default Favorite
