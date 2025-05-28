import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './MainPage.css'; 
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
    

  return (
    <section className='main'>
      <div className='initial' id='mainInitial'>
        <h3>Welcome to CourseMaster</h3>
        <p>Explore top-rated courses and boost your skills today.</p>
        <button className='btn' onClick={() => navigate('/courses/preview')}>Get Started</button>
      </div>
    </section>
  );
};



export default MainPage;
