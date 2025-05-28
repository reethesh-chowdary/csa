import React, { use } from 'react'
import './AdminDashboard.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
function AdminDashboard() {
  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem('Admintoken')) {
      navigate('/admin/dashboard');
    } else {
      alert('Please Login As Admin First');
      navigate('/');
      window.location.reload();
    }
  },[])
  return (
    <div className='admin-main'>
      <div className='admin-headings'>
        <h3>Admin Dashboard</h3>
        <h4>Welcome, This is where admin and add a 'Course' and Delete One and also he Can edit one</h4>
      </div>
      <div className="admin-dashboard">
        <div className="admin-card">
          <h2>Manage Courses</h2>
          <button className='btns' onClick={()=>navigate('/admin/addcourse')}>Add Course</button>
          <button className='btns' onClick={()=>navigate('/admin/perspective')}>Edit Course</button>
          <button className='btns' onClick={()=>navigate('/admin/perspective')}>Delete Course</button>
        </div>
      </div>
      <div className='buttons'>
        <button className='outBtns' onClick={()=>navigate('/admin/perspective')}>Review Your Own Courses</button> 
        <button className='outBtns' onClick={()=>navigate('/courses/preview')}>Review all courses</button>
      </div>
    </div>
  )
}

export default AdminDashboard