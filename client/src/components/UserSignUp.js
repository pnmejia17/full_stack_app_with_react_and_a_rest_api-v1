import { useNavigate, useSearchParams } from "react-router-dom"
import { api } from "../utils/apiHelper"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useRef } from "react"
import UserContext from "../context/UserContext"


function UserSignUp  ()  {
    const firstName = useRef(null)
    const lastName = useRef(null)
    const emailAddress = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()
    const [errors, setErrors]= useState([])
    const {actions} = useContext(UserContext)

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

    try {
        const res = await api('/users', 'POST', user)
        if (res.status === 201){
            await actions.signIn(user)
            navigate('/')
        } else if (res.status === 400) {
            const errorInfo = await res.json()
            setErrors(errorInfo.errors)
        } else {
            throw new Error()
        }
        } catch (error) {
            console.log(`Errors: ${error}`)
        }
     }

    return(
        <div className="form--centered">
            <h2>Sign Up</h2>
            { errors.length ?
                <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li>{error}</li>)}
                        </ul>
                </div> : null }    
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value="" ref={firstName}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value="" ref={lastName}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" ref={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value="" ref={password}/>
                    <button className="button" type="submit">Sign Up</button><button class="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to='/signin'>Sign In</Link>!</p>
            </div>
    )
}



export default UserSignUp