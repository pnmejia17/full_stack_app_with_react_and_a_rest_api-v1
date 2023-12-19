import { api } from "../utils/apiHelper";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const navigate = useNavigate()
    const title = useRef(null)
    const description = useRef(null)
    const estimatedTime = useRef(null)
    const materialsNeeded = useRef(null)
    const [errors, setErrors] = useState([])
    const {auth} = useContext(UserContext)


    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const newCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value, 
            materialsNeeded: materialsNeeded.current.value, 
            userId: (auth ? auth.id : null)
        }

        try {
            const res = api(`/courses`, 'POST', newCourse, auth)
                if (res.status === 201) {
                    console.log(`New Course ${newCourse.title} was added`)
                        navigate('/')
                } else if (res.status === 400) {
                    const errorInfo = await res.json()
                    setErrors(errorInfo.errors)
                    console.log(errorInfo.errors)
                }
        } catch (error) {
            console.log("Error fetching and parsing data", error)
                    }
                }

    return (
            <div className="wrap">
                <h2>Create Course</h2>
                { errors.length ?
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li>{error}</li>)}
                        </ul>
                </div> : null }
                <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label html="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" ref={title}/>

                                <p>By {auth.firstName} {auth.lastName}</p>

                                <label hmtl="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                            </div>
                            <div>
                                <label hmtl="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime}/>

                                <label hmtl="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>)}

export default CreateCourse