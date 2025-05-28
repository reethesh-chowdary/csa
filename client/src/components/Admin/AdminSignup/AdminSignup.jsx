import React from 'react'
import './AdminSignup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AdminSignup() {
    const navigate = useNavigate()
    async function signUp() {
        const email = document.getElementById('email').value
        const firstname = document.getElementById('firstName').value
        const lastname = document.getElementById('lastName').value
        const password = document.getElementById('password').value
        const details = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:5005/admin/signup', details)
            if (response.status === 200) {
                alert('Signup successful')
                console.log(response.data)
                navigate('/admin/signin')
            } else {
                alert('Signup failed')
            }
        } catch (error) {
            console.error('Error during signup:', error)
            alert('An error occurred during signup. Please try again.')
        }
    }
    return (
        <div className='admin-signup-container'>
            <div className='admin-signup-card'>
                <h1 className='admin-signup-heading'>Admin Signup</h1>
                <div className='inputs'>
                    <input type="email" placeholder='Email' id='email' className='admin-signup-input' required />
                    <input type="text" placeholder='FirstName' id='firstName' className='admin-signup-input' required />
                    <input type="text" placeholder='LastName' id='lastName' className='admin-signup-input' required />
                    <input type="password" placeholder='Password' id='password' className='admin-signup-input' required />
                    <button className='admin-signup-button' onClick={signUp}>Signup</button>
                </div>
                <p>Already have an account? <a onClick={() => navigate('/admin/signin')} className='admin-signin-link'>Signin</a></p>
            </div>
        </div>
    )
}

export default AdminSignup