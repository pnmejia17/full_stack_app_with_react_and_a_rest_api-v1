import React, { useContext } from "react"
import {
    useEffect,
    useState
} from "react"
import {
    useParams,
    Link
} from 'react-router-dom'
import UserContext from "../context/UserContext"



const CourseDetail = () => {
    const [course, setCourse] = useState(null)
    const {id} = useParams()
    const {auth} = useContext(UserContext)

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

console.log(course)

    if (course) {
        return ( 
            <>
            <div className = "actions--bar" >
                <div className = "wrap" >
                    {
                        auth && auth.id === course.userId ?
                    <>
                    <Link className = "button" to = {`/courses/${id}/update`} > Update Course </Link> 
                    <Link className = "button" to = "/"> Delete Course </Link></> : null}
                    <Link className = "button button-secondary" to = "/" > Return to List </Link> 
                </div> 
            </div>

            <div className = "wrap" >
                <h2> Course Detail </h2> 
                <div className = "main--flex" >
                    <div >
                        <h3 className = "course--detail--title" > Course </h3> 
                        <h4 className = "course--name" > {course?.title} </h4> 
                        <p> By {course?.User.firstName} {course?.User.lastName} </p>
                        <ReactMarkDown children={course?.description}/>
                    </div> 

                    <div>
                        <h3 className = "course--detail--title" > Estimated Time </h3> 
                        <p > {course?.estimatedTime} </p>

                        <h3 className = "course--detail--title"> Materials Needed </h3> 
                        <ul className = "course--detail--list" >
                            <ReactMarkDown children={course?.materialsNeeded} />
                        </ul>
                    </div> 
                </div> 
            </div> 
        </>)}}


export default CourseDetail