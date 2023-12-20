import { api } from '../utils/apiHelper';
import {
    useState,
    createContext
} from 'react';


const UserContext = createContext(null)


export const UserProvider = (props) => {
    const [auth, setAuth] = useState(null)
    
    // signs user in
    const signIn = async (credentials) => {
        const res = await api('/users', 'GET', null, credentials)

        if (res.status === 200) {
            let user = await res.json()

            user.password = credentials.password
            setAuth(user)

            return user
        } else if (res.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }

    //signs user out
    const signOut = () => {
        setAuth(null)
    }

return ( 
    <UserContext.Provider value={
        {
            auth: auth,
            actions: {
                signIn, signOut}}}>
    {props.children}
    </UserContext.Provider> )}



export default UserContext