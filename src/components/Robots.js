import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function Robots () {
  const [bots, setBots]= useState([])
  useEffect(() => {
    fetch("https://robot-data-base.onrender.com/bots")
    .then(res => res.json())
    .then(data => setBots(data))
  },[])
  //console.log(bots);
  const renderBots = bots.map(bot => {
    //console.log(bot);
    return(
    
       <div key={bot.id} className="card m-2" >
         <img src={bot.avatar_url} className="card-img-top" alt="..."/>
         <div className="card-body">
           <h5 className="card-title">{bot.name}</h5>
           <p className="card-text">{bot.catchphrase}</p>
           <Link to={`/description/${bot.id}`} className="btn btn-primary">view</Link>
         </div>
       </div>
     
    )
   })
  return(
    <div className="card-container mx-auto">
     {renderBots}
    </div>
  )
  
}

export default Robots