import React from 'react'
import './AdminSignin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AdminSignin() {
    const navigate = useNavigate()
    async function Signin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = {
             email, 
             password 
            };

        try {
            const response = await axios.post('https://csa-dmbk.onrender.com/admin/signin', details);

            if (response.status === 200) {
                alert('Signin successful');
                console.log(response.data);
                localStorage.setItem('Admintoken', response.data.token);
                navigate('/');
                window.location.reload();
                
            } else {
                alert('Signin failed');
            }
        } catch (error) {
            console.error('Signin error:', error);
            alert('Signin failed: ' + (error.response?.data?.message || 'Please try again.'));
        }
    }

    return (
        <div className='admin-signin-container'>
            <div className='admin-signin-card'>
                <h1 className='admin-signin-heading'>Admin Signin</h1>
                <div className='inputs'>
                    <input type="text" placeholder="Email" id='email' className='admin-signin-input' />
                    <input type="password" placeholder="Password" id='password' className='admin-signin-input' />
                    <button className='admin-signin-button' onClick={Signin}>Signin</button>
                </div>
                <div>
                    <p className='admin-signin-text'>Don't have an account? <a onClick={() => navigate('/admin/signup')} className='admin-signup-link'>Signup</a></p>
                </div>
            </div>
        </div>
    )
}

export default AdminSignin