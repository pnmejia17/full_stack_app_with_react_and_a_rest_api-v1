import './App.css';
import {
  useEffect,
  useState
} from 'react'

function App() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.log("Error fetching and parsing data", error))
  }, [])


  return ( 
  <>
      <ul> {
        courses.map(course => <li key={course.id}> {
            course.title
          } </li>)}</ul >
          </>

        );
      }
      export default App;