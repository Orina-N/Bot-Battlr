import Favorite from "../components/Favorite"
import Robots from "../components/Robots"

function Home () {
    return (
      <>
         <header>
           <Favorite/> 
         </header>
         <main>
           <Robots/>
         </main>
      </>
    )
}

export default Home