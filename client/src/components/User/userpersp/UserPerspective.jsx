import React , {useState,useEffect} from 'react'
import axios from 'axios';
import UserCard from "../usercard/UserCard";
import './UserPerspective.css';
function UserPerspective() {
  const [courseData, setCourseData] = useState([]);

  async function preview() {
    try {
      const response = await axios.get('https://csa-dmbk.onrender.com/courses/', {
        headers: {
          token: localStorage.getItem('Usertoken')
        }
      });
      const { courses } = response.data;
      setCourseData(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    preview(); 
  }, []); 

  return (
    <div>
      <h4>Courses Preview</h4>
      {courseData && courseData.length > 0 ? (
        <div className='course-list'>
          {courseData.map((i) => (
            <UserCard key={i._id} course={i} />
          ))}
        </div>
      ) : (
        <div className='total'>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );

}

export default UserPerspective