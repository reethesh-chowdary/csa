import React from 'react'
import './UserSignup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function UserSignup() {
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
            const response = await axios.post('https://csa-dmbk.onrender.com/user/signup', details)
            if (response.status === 200) {
                alert('Signup successful')
                console.log(response.data)
                navigate('/user/signin')
            } else {
                alert('Signup failed')
            }
        } catch (error) {
            console.error('Error during signup:', error)
            alert('An error occurred during signup. Please try again.')
        }
    }
  return (
    <div className='user-signup-container'>
            <div className='user-signup-card'>
                <h1 className='user-signup-heading'>User Signup</h1>
                <div className='inputs'>
                    <input type="email" placeholder='Email' id='email' className='user-signup-input' required />
                    <input type="text" placeholder='FirstName' id='firstName' className='user-signup-input' required />
                    <input type="text" placeholder='LastName' id='lastName' className='user-signup-input' required />
                    <input type="password" placeholder='Password' id='password' className='user-signup-input' required />
                    <button className='user-signup-button' onClick={signUp}>Signup</button>
                </div>
                <p>Already have an account? <a onClick={() => navigate('/user/signin')} className='user-signin-link'>Signin</a></p>
            </div>
        </div>
  )
}

export default UserSignup