import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Favorite from "../components/Favorite"

function Description() {
    // State to hold the details of the bot
    const [bots, setBots] = useState({})
    // Get the bot ID from URL parameters
    const params = useParams()
    const botId = params.id
    // Hook for programmatic navigation
    const navigate = useNavigate()

    // Fetch bot details based on the bot ID when the component mounts or botId changes
    useEffect(() => {
        fetch(`https://botsdb.onrender.com/bots/${botId}`)
        .then(res => res.json())
        .then(data => setBots(data))
    }, [botId])

    // Function to handle deleting a bot
    function handleDelete(id) {
        fetch(`https://botsdb.onrender.com/bots/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            // Reset bot details after successful deletion
            setBots({})
        })
    }

    // Function to handle enlisting a bot as favorite
    function handleEnlist() {
        fetch("https://botsdb.onrender.com/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Send bot details in the request body
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

    // Function to navigate back to the home page
    function goBack() {
        navigate("/")
    }

    // Conditionally render enlist button if bot ID exists
    const enlist = bots.id && <button onClick={handleEnlist} className="buttons btn btn-success">Enlist</button>
    // Button to navigate back to home page
    const goHome = <button onClick={goBack} className="buttons btn btn-warning">Go Back</button>
    // Button to delete the bot
    const eliminate = <button onClick={() => handleDelete(bots.id)} className="buttons btn btn-danger">Delete</button>

    return (
        <>
            <Favorite /> {/* Component to display favorite bots */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-4  col-sm-12 image-carrier">
                        {/* Display bot image */}
                        <img src={bots.avatar_url} className="image mt-3 mb-3" alt="Robot" />
                    </div>
                    <div className="col-lg-8 mt-5  mb-3 details-container">
                        {/* Display bot details */}
                        <h2>Name: {bots.name}</h2>
                        <h3>Catchphrase:</h3>
                        <p>{bots.catchphrase}</p>
                        <h4>Class: {bots.bot_class}</h4>
                        <div className="stats">
                            {/* Display bot stats */}
                            <h6 className="stat">Health: {bots.health}</h6>
                            <h6 className="stat">Damage: {bots.damage}</h6>
                            <h6 className="stat">Armor: {bots.armor}</h6>
                        </div>
                        <div>
                            {/* Render buttons */}
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
