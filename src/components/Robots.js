import { useEffect, useState } from "react"


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
           <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <a href="#" className="btn btn-primary">Go somewhere</a>
         </div>
       </div>
     
    )
   })
  return(
    <div className="card-container">
     {renderBots}
    </div>
  )
  
}

export default Robots