import React from 'react'
import './AdminCard.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditCard from '../EditingCard/EditCard';
function AdminCard(props) {
    const { course } = props;
    const [courseId, setCourseId] = useState(course._id);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('Admintoken')) {
            alert('Please Login As Admin First');
            navigate('/');
            window.location.reload();
        }
    }, [navigate]);
    
    async function onDelete() {
        setCourseId(course._id.toLocaleString());
        try {
            const response = await axios.delete(`https://csa-dmbk.onrender.com/admin/deletecourse?courseId=${courseId}`, {
                headers: {
                    token: localStorage.getItem('Admintoken')
                }
            });
            if (response.status === 200) {
                alert('Course deleted successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        }
    }
    async function onEdit() {
        setCourseId(course._id);
        try {
            const response = await axios.get(`https://csa-dmbk.onrender.com/admin/editcourse?courseId=${courseId}`, {
                headers: {
                    token: localStorage.getItem('Admintoken')
                }
            });
            if (response.status === 200) {
                navigate('/admin/editcourse', {
                    state: { course: response.data.course }
                });
                
            }
        } catch (error) {
            console.error('Error fetching course for edit:', error);
            alert('Failed to fetch course details for editing. Please try again.');
        }
    }
  return (
    <div>
        <div className="course-card">
            <img src={course.imageURL} alt={course.title} className="course-image" />
            <div className="course-content">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p className="price">₹{course.price.toLocaleString()}</p>
            </div>
            <div className="admin-card-buttons">
                <button className='btns' onClick={onEdit}>Edit</button>
                <button className='btns' onClick={onDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default AdminCard