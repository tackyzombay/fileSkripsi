import React, { useState } from 'react'
import './ReviewBox.css'
import { backend_url } from "../../App";
const ReviewBox = (props) => {
  const [userReview, setUserReview] = useState("");
  const userLoggedIn = !!localStorage.getItem("auth-token");
  const submitReview = async () => {
    await fetch(`${backend_url}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({
        userReview: userReview,
        productId: props.id
      }),
    }).then((resp) => resp.json())
    alert("Successfully add review!");
    window.location.reload();
  }
  return (
    <div className="reviewbox">
      <div className="reviewbox-navigator">
        <div className="reviewbox-nav-box">Review</div>
      </div>
      <div className="reviewbox-description">
        {
          props.review.map((singleReview) => (
            <div className='reviewbox-description-text'>
              <h4>{singleReview.username}</h4>
              <p>{singleReview.review}</p>
            </div>
          ))
        }
      </div>
      {
        userLoggedIn && (
          <div className='reviewbox-input'>
            <div className="reviewbox-input-text">
              <input type='text' value={userReview} onChange={(event) => { setUserReview(event.target.value) }} placeholder='Masukkan review anda...'></input>
            </div>
            <div className="reviewbox-input-submit">
              <button onClick={submitReview}>Submit review</button>
            </div>

          </div>
        )
      }
    </div>
  )
}

ReviewBox.defaultProps = {
  review: []
}
export default ReviewBox