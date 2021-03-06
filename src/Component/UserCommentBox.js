import {useState} from 'react';
import '../css/UserCommentBox.css';
import { setTime } from '../Model/CommonFnc.js';
import user_male from '../assets/images/user_male.png';
import star_rate_1 from '../assets/images/star-rate-1.png';
import star_rate_2 from '../assets/images/star-rate-2.png';
import star_rate_3 from '../assets/images/star-rate-3.png';
import star_rate_4 from '../assets/images/star-rate-4.png';
import star_rate_5 from '../assets/images/star-rate-5.png';

function UserCommentBox(props) {

  let user_comment = props.comment.user_comment.split('\n');

  function getStarRate(value){
    let star = value;
    let result = star_rate_1;

    if(star === 1){
      result = star_rate_1;
    }else if(star === 2){
      result = star_rate_2;
    }else if(star === 3){
      result = star_rate_3;
    }else if(star === 4){
      result = star_rate_4;
    }else if(star === 5){
      result = star_rate_5;
    }

    return result;
  }
  function showUserPhothes(){
    if(props.comment.user_photo === null) return;
    let user_photo = props.comment.user_photo.split(',');

    let result = user_photo.map((photo)=>{
      return <img src={photo}/>
    });

    return result;
  }

  return (
    <div>
      <div className="comment-title">
          <div className="sumnail-wrap">
            <img src={user_male} id="comment-sumnail"/>
          </div>
          <div>
            <div className="user-wrap">
              <span className="comment-id">{props.comment.user_id}</span>
              <img src={getStarRate(props.comment.star_rate)} className="comment-star-rate"/>
            </div>
            <div className="date-wrap">
              <span>{setTime(props.comment.user_update_date)}</span>
            </div>
          </div>

      </div>
      <div className="comment-desc">
        {
          showUserPhothes()
        }
        <p>{
          user_comment
          ? user_comment.map((item)=>{
            return <span>{item}<br/></span>
          })
          : null
        }</p>
      </div>

    </div>
  )
}

export default UserCommentBox;
