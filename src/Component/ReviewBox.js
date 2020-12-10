import {useState} from 'react';
import '../css/ReviewBox.css';

function ReviewBox(props) {


  return (
    <li>
      <div className="riview-box">
        <div className="review-sumnail">
          <strong>{props.list.category}</strong>
        </div>

        <div className="review-description">
          <div className="avg-wrap">
            <strong>사용자 총 평점</strong>
            <div className="star-point"></div>
            <span>{props.list.star_rate} / 5.0</span>
            <hr/>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ReviewBox;
