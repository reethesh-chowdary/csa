import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './UserDashboard.css'
function UserDashboard() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('Usertoken')) {
            navigate('/user/dashboard');
        } else {
            alert('Please Login As User First');
            navigate('/');
            window.location.reload();
        }
    }, [navigate])
    async function onPurchase() {
        try {
            const response = await axios.get('http://localhost:5005/user/purchases', {
                headers: {
                    token: localStorage.getItem('Usertoken')
                }
            });
            if (response.status === 200) {
                alert('You can now purchase a course');
                navigate('/user/perspective');
            }
        } catch (error) {
            console.error('Error fetching purchase options:', error);
            alert('Failed to fetch purchase options. Please try again.');
        }
    }
    
    return (
        <div className='user-main'>
            <div className='user-headings'>
                <h3>User Dashboard</h3>
                <h4>Welcome, This is where User can Buy a 'Course' or Review all the availabla courses</h4>
            </div>
            <div className="user-dashboard">
                <div className="user-card">
                    <h2>Manage Courses</h2>
                    <button className='btns' onClick={()=>navigate('/courses/preview')}>Review all courses</button>
                    <button className='btns' onClick={onPurchase}>Purchase a Course</button>
                    <button className='btns' onClick={() => navigate('/user/purchases')}>Review Purchased Courses</button>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard