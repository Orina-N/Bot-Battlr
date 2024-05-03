import Home from "./Pages/Home";
import Description from "./Pages/Description";

const routes = [
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/description/:id",
        element:<Description/>
    }
]
 
export default routes