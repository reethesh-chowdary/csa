import React from 'react'
import './UserSignin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function UserSignin() {
    const navigate = useNavigate()


    async function Signin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = {
            email,
            password
        };

        try {
            const response = await axios.post('https://csa-dmbk.onrender.com/user/signin', details);

            if (response.status === 200) {
                alert('Signin successful');
                console.log(response.data);
                localStorage.setItem('Usertoken', response.data.token);
                navigate('/user/dashboard');
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
        <div className='user-signin-container'>
            <div className='user-signin-card'>
                <h1 className='user-signin-heading'>User Signin</h1>
                <div className='inputs'>
                    <input type="text" placeholder="Email" id='email' className='user-signin-input' />
                    <input type="password" placeholder="Password" id='password' className='user-signin-input' />
                    <button className='user-signin-button' onClick={Signin}>Signin</button>
                </div>
                <div>
                    <p className='user-signin-text'>Don't have an account? <a onClick={() => navigate('/user/signup')} className='user-signup-link'>Signup</a></p>
                </div>
            </div>
        </div>
    );
}


export default UserSignin