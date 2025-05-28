import React from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
function LoginPage() {
    const navigate = useNavigate()
    return (
        <div className="signin-container">
            <h1 className="signin-heading">Welcome to CourseMaster</h1>
            <div className="signin-buttons">
                <button className="signin-button" onClick={() => navigate('/admin/signin')}>
                    Admin Signin
                </button>
                <button className="signin-button" onClick={() => navigate('/user/signin')}>
                    User Signin
                </button>
            </div>
        </div>
    )
}

export default LoginPage