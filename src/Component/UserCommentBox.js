import {useState} from 'react';
import '../css/UserCommentBox.css';
import user_male from '../assets/images/user_male.png';
import star_rate_3 from '../assets/images/star-rate-3.png';

function UserCommentBox() {


  return (
    <div>
      <div className="comment-title">
          <div id="sumnail-wrap">
            <img src={user_male} id="comment-sumnail"/>
          </div>
          <div>
            <div id="user-wrap">
              <span id="comment-id">아이디</span>
              <img src={star_rate_3} id="comment-star-rate"/>
            </div>
            <div id="date-wrap">
              <span>2020-12-13</span>
            </div>
          </div>

      </div>
      <div className="comment-desc">
        <img src="af"/>
        <p>유저가 남기는 코멘트 ~</p>
      </div>

    </div>
  )
}

export default UserCommentBox;
