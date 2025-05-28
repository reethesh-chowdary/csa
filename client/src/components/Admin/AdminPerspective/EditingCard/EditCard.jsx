import React, { useEffect, useState } from 'react';
import './EditCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('Admintoken')) {
      alert('Please Login As Admin First');
      navigate('/');
      return;
    }

    if (!course) {
      alert("No course data provided");
      navigate('/admin/dashboard');
      return;
    }

    setCourseId(course._id);
    setTitle(course.title);
    setPrice(course.price);
    setImageURL(course.imageURL);
    setDescription(course.description);
  }, [course, navigate]);

  async function updatingCourse() {
    const details = {
      title,
      price,
      imageURL,
      description
    };

    try {
      const response = await axios.put(
        `http://localhost:5005/admin/updatecourse?courseId=${courseId}`,
        details,
        {
          headers: {
            token: localStorage.getItem('Admintoken')
          }
        }
      );

      if (response.status === 200) {
        alert('Course updated successfully');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    }
  }

  return (
    <div className='admin-main'>
      <div className='admin-headings'>
        <h3>Edit Course</h3>
      </div>
      <div className="admin-dashboard">
        <div className="admin-card">
          <h2>Course Details</h2>
          <p>Title:</p>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inputs"
            required
          />
          <p>Price:</p>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="inputs"
            required
          />
          <p>Image URL:</p>
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="inputs"
            required
          />
          <p>Description:</p>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="inputs"
            required
          />
          <button className="btns" onClick={updatingCourse}>Update Course</button>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
