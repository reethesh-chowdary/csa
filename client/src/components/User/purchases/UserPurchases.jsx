import React , {useState,useEffect} from 'react'
import axios from 'axios';
import Purchasecard from "../usercard/Purchasecard.jsx";

function UserPurchases() {
  const [courseData, setCourseData] = useState([]);

  async function preview() {
    try {
      const response = await axios.get('https://csa-dmbk.onrender.com/user/purchases', {
        headers: {
          token: localStorage.getItem('Usertoken')
        }
      });
      const { allCourses } = response.data;
      setCourseData(allCourses);
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
            <Purchasecard key={i._id} course={i} />
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

export default UserPurchases