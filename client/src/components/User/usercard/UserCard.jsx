import React from 'react'
import './UserCard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserCard(props) {
    const { course } = props;
    async function onPurchase() {
        try {
            const response = await axios.post(`https://csa-dmbk.onrender.com/courses/purchase?courseId=${course._id}`,{}, {
                headers : {
                    token: localStorage.getItem('Usertoken')}
                 })
            if (response.status === 200) {
                
                alert('Course purchased successfully!');
                // window.location.reload();
            } else {
                throw new Error('Failed to purchase course');
            }
        } catch (error) {
            console.error('Error purchasing course:', error);
            alert('Failed to purchase course. Please try again.');
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
            <div className="user-card-buttons">
                <button className='btns' onClick={onPurchase}>Purchase</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard