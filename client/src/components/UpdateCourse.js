import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateCourse = () => {
    const {id} = useParams();
    const [course, setCourse] = useState(null)
    const navigate = useNavigate()
    const title = useRef(null)
    const description = useRef(null)
    const estimatedTime = useRef(null)
    const materialsNeeded = useRef(null)


    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses/${id}`)
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
    }, [id])

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setCourse((prevState) => ({
            ...prevState, 
            [name]: value,
        }))    }
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5000/api/courses/${id}`, "PUT", course)
    }

    if (course) {
        return (
            <div className="wrap">
                <h2>Update Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="title">Course Title</label>
                                <input id="title" name="title" type="text" value={course.title} onChange={handleChange}/>
            
                                {/* <p>By {course.User.firstName} {course.User.lastName}</p> */}
            
                                <label htmlFor="description">Course Description</label>
                                <textarea id="description" name="description" value={course.description} onChange={handleChange} > </textarea>
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