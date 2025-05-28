import React from 'react'
import './AddCourse.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AddCourse() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('Admintoken')) {
            navigate('/admin/addcourse');
        } else {
            alert('Please Login As Admin First');
            navigate('/');
            window.location.reload();
        }
    }, [])
    async function addingCourse() {
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const imageURL = document.getElementById('imgURL').value;
        const description = document.getElementById('description').value;

        const details = {
            title,
            description,
            price,
            imageURL
        };

        try {
            const response = await axios.post(
                'https://csa-dmbk.onrender.com/admin/addcourse',
                details,
                {
                    headers: {
                        token: localStorage.getItem('Admintoken')
                    }
                }
            );

            if (response.status === 200) {
                alert('Course added successfully');
                console.log(response.data);
                navigate('/admin/dashboard');
                window.location.reload();
            } 
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course Please try again.');
        }
    }
    return (
        <div className='admin-main'>
            <div className='admin-headings'>
                <h3>Admin Adding a New Course</h3>
            </div>
            <div className="admin-dashboard">
                <div className="admin-card">
                    <h2>New Course</h2>
                    <p>Title: </p>
                    <input type="text" placeholder='Title' id='title' className='inputs' required />
                    <p>Price: </p>
                    <input type="text" placeholder='Price' id='price' className='inputs' required />
                    <p>Image URL: </p>
                    <input type="text" placeholder='ImageURL' id='imgURL' className='inputs' required />
                    <p>Description: </p>
                    <textarea type="area" placeholder='Description' id='description' className='inputs' required />
                    <button className='btns' onClick={addingCourse}>Add Course</button>
                </div>
            </div>

        </div>
    )
}

export default AddCourse