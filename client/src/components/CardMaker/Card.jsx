import React from 'react'
import './Card.css';
function Card(props) {
    const { course } = props;
  return (
    <div>
        <div className="course-card">
            <img src={course.imageURL} alt={course.title} className="course-image" />
            <div className="course-content">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p className="price">₹{course.price.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default Card