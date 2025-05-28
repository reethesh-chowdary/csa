import React from 'react';
import './Navbar.css'; 
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!(localStorage.getItem('Admintoken') || localStorage.getItem('Usertoken'))
  );
  async function loggingOut() {
    localStorage.removeItem('Admintoken');
    localStorage.removeItem('Usertoken');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  }
  async function Verification() {
    if (localStorage.getItem('Admintoken')) {
      navigate('/admin/dashboard');
    }
    else if (localStorage.getItem('Usertoken')) {
      navigate('/user/dashboard');
    } else {
      alert('Please login first');
    }
  }
  function Come(){
    alert('Please Login As Admin (OR) User To Continue');
    navigate('/login');
    window.location.reload();
  }
  useEffect(() => {
    console.log(1)
  },[isLoggedIn])
  return (
    <nav className='navbar'>
      <div className='logo' onClick={() => navigate('/')}>CourseMaster</div>
      <div className='lists'>
        <button onClick={() => navigate('/')}>Home</button>
        
        {isLoggedIn ? (
          <button onClick={Verification}>Manage Courses</button>
        ) : (
          <button onClick={Come}>Courses</button>
        )}
        
        {isLoggedIn ? (
          <button onClick={loggingOut}>LogOut</button>
        ) : (
          <button onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
