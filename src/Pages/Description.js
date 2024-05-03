import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Favorite from "../components/Favorite"

function Description () {
    const [bots, setBots] = useState([])
    const params = useParams()
    const botId = params.id
    //console.log(params);

    useEffect(() => {
        fetch(`https://robot-data-base.onrender.com/bots/${botId}`)
        .then(res => res.json())
        .then(data => setBots(data))
    },[])

    return(
     <>
      <Favorite/>
      <div className="container">
        <div className="row">
            <div className="col-lg-4  col-sm-12 image-carrier">
                <img src={bots.avatar_url} className="image mt-3 mb-3"/>
            </div>
            <div className="col-lg-8 mt-5  mb-3 details-container">
                <h2>Name:{bots.name}</h2>
                <h3>Catchphrase:</h3>
                <p>{bots.catchphrase}</p>
                <h4>Class:{bots.bot_class}</h4>
                <div className="stats">
                    <h6 className="stat">Health:{bots.health}</h6>
                    <h6 className="stat">Damage:{bots.damage}</h6>
                    <h6 className="stat">Armor:{bots.armor}</h6>
                </div>
                <div>
                    <button className="buttons btn btn-success ">Enlist</button>
                    <button className="buttons btn btn-warning">Go Back</button>
                    <button className="buttons btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
      </div>
      </>
    )
}

export default Description