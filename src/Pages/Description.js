import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Favorite from "../components/Favorite"

function Description() {
    const [bots, setBots] = useState({})
    const params = useParams()
    const botId = params.id
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://botsdb.onrender.com/bots/${botId}`)
        .then(res => res.json())
        .then(data => setBots(data))
    }, [botId])

    function handleDelete(id) {
        fetch(`https://botsdb.onrender.com/bots/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setBots({})
        })
    }

    function handleEnlist() {
        fetch("https://botsdb.onrender.com/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: bots.id,
                name: bots.name,
                health: bots.health,
                damage: bots.damage,
                armor: bots.armor,
                bot_class: bots.bot_class,
                catchphrase: bots.catchphrase,
                avatar_url: bots.avatar_url,
                created_at: bots.created_at,
                updated_at: bots.updated_at
            })
        })
    }

    function goBack() {
        navigate("/")
    }

    const enlist = bots.id && <button onClick={handleEnlist} className="buttons btn btn-success">Enlist</button>
    const goHome = <button onClick={goBack} className="buttons btn btn-warning">Go Back</button>
    const eliminate = <button onClick={() => handleDelete(bots.id)} className="buttons btn btn-danger">Delete</button>

    return (
        <>
            <Favorite />
            <div className="container">
                <div className="row">
                    <div className="col-lg-4  col-sm-12 image-carrier">
                        <img src={bots.avatar_url} className="image mt-3 mb-3" alt="Robot" />
                    </div>
                    <div className="col-lg-8 mt-5  mb-3 details-container">
                        <h2>Name: {bots.name}</h2>
                        <h3>Catchphrase:</h3>
                        <p>{bots.catchphrase}</p>
                        <h4>Class: {bots.bot_class}</h4>
                        <div className="stats">
                            <h6 className="stat">Health: {bots.health}</h6>
                            <h6 className="stat">Damage: {bots.damage}</h6>
                            <h6 className="stat">Armor: {bots.armor}</h6>
                        </div>
                        <div>
                            {enlist}
                            {goHome}
                            {eliminate}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Description