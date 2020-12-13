import {useState} from 'react';
import '../css/ReviewBox.css';
import UserCommentBox from '../Component/UserCommentBox';
import star_empty from '../assets/images/star_empty.png';
import star_half from '../assets/images/star_half.png';
import star_full from '../assets/images/star_full.png';

function ReviewBox(props) {

  function displaySizeChange(index){
    let element = document.getElementsByClassName('review-list');
    for(let i = 0; i < element.length; i++){
      if(index === i){
        element[i].firstElementChild.classList.add('on');
        element[i].firstElementChild.classList.remove('small');
        continue;
      }
      element[i].firstElementChild.classList.remove('on');
      element[i].firstElementChild.classList.add('small');
    }
    console.log(element);
  }

  return (
    <li className="review-list">
      <div className="riview-box">
        <div onClick={()=> {displaySizeChange(props.index)}} className="review-overwrap"> </div>
        <div className="review-sumnail">
          <strong>{props.list.category}</strong>
        </div>

        <div className="review-description">
          <div className="avg-wrap">
            <strong>사용자 총 평점</strong>
            <StarRate star_rate={props.list.star_rate}></StarRate>
            <span>{props.list.star_rate} / 5.0</span>
          </div>
          <div className="user-comments-wrap">
            <UserCommentBox></UserCommentBox>
            <UserCommentBox></UserCommentBox>
            <UserCommentBox></UserCommentBox>
            <UserCommentBox></UserCommentBox>
          </div>
        </div>
      </div>
    </li>
  )
}

function StarRate(props){
  let starRate = props.star_rate;

  if(starRate < 0.5){
    return <div className="star-rate"><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 1.0){
    return <div className="star-rate"><img src={star_half}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 1.5){
    return <div className="star-rate"><img src={star_full}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 2.0){
    return <div className="star-rate"><img src={star_full}/><img src={star_half}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 2.5){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_empty}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 3.0){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_half}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 3.5){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_empty}/><img src={star_empty}/></div>
  }else if(starRate < 4.0){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_half}/><img src={star_empty}/></div>
  }else if(starRate < 4.5){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_empty}/></div>
  }else if(starRate < 5.0){
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_half}/></div>
  }else{
    return <div className="star-rate"><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_full}/><img src={star_full}/></div>
  }
}

export default ReviewBox;
