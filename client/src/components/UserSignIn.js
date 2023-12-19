import { useContext, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"

const UserSignIn = () => {
    const emailAddress = useRef(null)
    const password = useState(null)
    const location  = useLocation()
    const { actions } = useContext(UserContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault()
        let from = '/'
        if (location.state){
            from = location.state.from
        }

        const credentials = {
            emailAddress: emailAddress.current.value, 
            password: password.current.value
        }

        try {
            const user = await actions.signIn(credentials)
            if (user) { 
                navigate(from)
            } else {
                setErrors([`Sign-in failed!`])
            }
        } catch (error) {
            console.log(`Errors: ${error}`)
        }
     }
     const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
            <div className="form--centered">
                <h2>Sign In</h2>
                { errors.length ?
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li>{error}</li>)}
                        </ul>
                </div> : null }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password}/>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to='/signup'>Sign up</Link>!</p>
            </div>)}


export default UserSignIn