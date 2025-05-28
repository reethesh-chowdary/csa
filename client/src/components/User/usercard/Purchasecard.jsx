import React from 'react'
import './UserCard.css';
function Purchasecard(props) {
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
                <div className="user-card-buttons">
                    <h4>Purchased</h4>
                </div>
            </div>
        </div>
    )

}

export default Purchasecard