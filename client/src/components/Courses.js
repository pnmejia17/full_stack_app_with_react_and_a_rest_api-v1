import {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'



const Courses = () => {
    const [courses, setCourses] = useState([])

    // retrieve all courses and set them to courses using 
    // useState React Hook
    
    useEffect(() => {
      fetch(`http://localhost:5000/api/courses`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(error => console.log("Error fetching and parsing data", error))
    }, [])

    return (
        <main>
            <div className="wrap main--grid">
                {
                courses.map((course) => (
                <NavLink
                key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>))}

                <NavLink className="course--module course--add--module" to={`courses/create`}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                    </span>
                </NavLink>
            </div>
        </main>)}

export default Courses