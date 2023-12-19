import {useState, useEffect, useRef, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

const UpdateCourse = () => {
    const {id} = useParams();
    const [course, setCourse] = useState(null)
    const navigate = useNavigate()
    const title = useRef(null)
    const description = useRef(null)
    const estimatedTime = useRef(null)
    const materialsNeeded = useRef(null)
    const {auth} = useContext(UserContext)
    const [errors, setErrors] = useState([])

    // retrieve course to be updated
    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await api(`/courses/${id}`, 'GET')
                if (res.status === 200) {
                    const fetchedData = await res.json()
                    console.log(fetchedData.course)
                    setCourse(fetchedData.course)
                    }
            } catch (error) {
                console.log("Error fetching and parsing data", error)
                }
            }
        getCourse()
    }, [id, auth.id])

    // navigates home if cancel button is clicked
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    // handles changes made to form
    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setCourse((prevState) => ({
            ...prevState, 
            [name]: value,
        }))    }

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const courseInfo = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: auth.id
        }
        console.log(courseInfo)
        const res = await api(`/courses/${id}`, "PUT", courseInfo, auth)
        }

    if (course) {
        return (
            <div className="wrap">
                <h2>Update Course</h2>
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
                                <label htmlFor="title">Course Title</label>
                                <input id="title" name="title" type="text" value={course.title} onChange={handleChange}/>
            
                                <p>By {auth.firstName} {auth.lastName}</p>
            
                                <label htmlFor="description">Course Description</label>
                                <textarea id="description" name="description" value=' ' onChange={handleChange} > {course.description} </textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={handleChange}/>
            
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                )
            }
    }

    

export default UpdateCourse