import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Favorite () {
    const[favorites, setFavorites] = useState([])
    useEffect(()=>{
        fetch("https://moviedatabase-g11e.onrender.com/favoriteBots")
        .then(res => res.json())
        .then(data => setFavorites(data))
    },[favorites])

    const renderFavorite = favorites.map(favorite => {
        //console.log(favorite);
        return (
            <div key={favorite.id} className="card m-2" >
               <img src={favorite.avatar_url} className="card-img-top" alt="..."/>
               <div className="card-body">
                  <h5 className="card-title">{favorite.name}</h5>
                  <p className="card-text">{favorite.catchphrase}</p>
                  <Link to={`/description/${favorite.id}`} className="btn btn-primary">view</Link>
               </div>
            </div>
        )
    })
    // console.log(favorites);
    return(
        <div className="favorites-carrier">
          {renderFavorite}
        </div>
    )
}

export default Favorite