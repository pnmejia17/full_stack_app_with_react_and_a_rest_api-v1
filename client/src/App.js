import './App.css';
import {
  useEffect,
  useState
} from 'react'

function App() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses`)
      .then(res => {
        setCourses(res)
        console.log(res)
        console.log(res.json())
      })
      .catch(error => console.log("Error fetching and parsing data", error))
  }, [])


  return ( 
    <></>
  // <>
  //     <ul> {
  //       courses.map(course => <li> {
  //           course.title
  //         } </li>)}</ul >
  //         </>

        );
      }
      export default App;