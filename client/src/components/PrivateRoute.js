import { useContext } from "react"
import UserContext from "../context/UserContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRoute = () => {
    const {auth} = useContext(UserContext)
    const location = useLocation()

    if (auth){
        return <Outlet/>
    } else {
        return <Navigate to="/signin" state={{from: location.pathname}}/>
    }
}

export default PrivateRoute