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
    
    const handleSubmit = async (e) =>
    e.preventDefault()
    const CourseDetails = {
        title: title?.current.value,
        description: description?.current.value,
        estimatedTime: estimatedTime?.current.value, 
        materialsNeeded: materialsNeeded?.current.value,

    }

    if (course) {
        return (
            <div className="wrap">
                <h2>Update Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label for="title">Course Title</label>
                                <input id="title" name="title" type="text" ref={title} defaultValue={course.title ? course.title : ''}/>
            
                                <p>By {course?.User.firstName} {course?.User.lastName}</p>
            
                                <label for="description">Course Description</label>
                                <textarea id="description" name="description" ref={description} defaultValue={course.description ? course.description:''} > </textarea>
                            </div>
                            <div>
                                <label for="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} defaultValue={course.estimatedTime ? course.estimatedTime:''}/>
            
                                <label for="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} defaultValue={course.materialsNeeded ? course.materialsNeeded:''}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Update Course</button>
                        <button class="button button-secondary" onclick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                )
            }
    }

    

export default UpdateCourse