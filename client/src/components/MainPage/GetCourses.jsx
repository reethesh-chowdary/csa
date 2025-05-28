import React,{useState,useEffect} from 'react'
import Card from '../CardMaker/Card';
import axios from 'axios';
import './GetCourses.css';
function GetCourses() {
    const [courseData,setCourseData] = useState([]);
    async function preview() {
            const response = await axios.get('http://localhost:5005/courses/');
            const {courses} = await response.data;
            setCourseData(courses);
        }
         
        useEffect(() => {
          preview(); 
            console.log(courseData);
        }, []);
  return (
    <div>
      <h4>Courses Preview</h4>
        {courseData.length > 0 ? (
        <div className='course-list'>
          {courseData.map((i) => (
            <Card key={i._id} course={i} />
          ))}
        </div>
      ) : <div className='total'><div className="loader"></div></div> }
    </div>
  )
}

export default GetCourses