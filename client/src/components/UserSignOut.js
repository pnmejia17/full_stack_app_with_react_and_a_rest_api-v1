import { useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import { Navigate } from "react-router-dom"




const UserSignOut = () => {
    // signs user out and navigates them to the homepage

    const {actions} = useContext(UserContext)

    useEffect(() => actions.signOut)

    return <Navigate to='/'></Navigate>
}


export default UserSignOut