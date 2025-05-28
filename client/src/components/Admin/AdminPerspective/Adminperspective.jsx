import React from 'react';
import './Adminperspective.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminCard from './adminCard/AdminCard';

function Adminperspective() {
  const [courseData, setCourseData] = useState([]);

  async function preview() {
    try {
      const response = await axios.get('http://localhost:5005/admin/course/bulk', {
        headers: {
          token: localStorage.getItem('Admintoken')
        }
      });
      const { courses } = response.data;
      setCourseData(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    preview(); // Run only once on initial mount
  }, []); // ✅ Important fix here

  return (
    <div>
      <h4>Courses Preview</h4>
      {courseData && courseData.length > 0 ? (
        <div className='course-list'>
          {courseData.map((i) => (
            <AdminCard key={i._id} course={i} />
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

export default Adminperspective;
