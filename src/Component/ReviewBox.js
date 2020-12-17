import {useState, useEffect} from 'react';
import '../css/ReviewBox.scss';
import axios from 'axios';
import UserCommentBox from '../Component/UserCommentBox';
import ReviewTextBox from '../Component/ReviewTextBox';
import star_empty from '../assets/images/star_empty.png';
import star_half from '../assets/images/star_half.png';
import star_full from '../assets/images/star_full.png';

function ReviewBox(props) {
  let element = document.getElementsByClassName('review-list');
  let [comments, setComments] = useState();
  let reviewbox;

  useEffect(()=>{
    axios.get('http://localhost:3000/api/review_detail', {params: {category: props.list.category}})
    .then((res)=>{
      setComments(res.data);
    })
  }, []);
  function displaySizeChange(){
    reviewbox = element[props.index].firstElementChild;

    if(reviewbox.classList.contains('on')){
      for(let i = 0; i < element.length; i++){
        reviewbox = element[i].firstElementChild;
        reviewbox.classList.remove('small');
        reviewbox.classList.remove('on');
      }
    }else{
      for(let i = 0; i < element.length; i++){
        reviewbox = element[i].firstElementChild;
          if(props.index === i){
            reviewbox.classList.add('on');
            reviewbox.classList.remove('small');
            continue;
          }
          reviewbox.classList.remove('on');
          reviewbox.classList.add('small');
      }
    }
  }

  return (
    <li className="review-list">
      <div className="riview-box">
        <div onClick={displaySizeChange} className="review-overwrap"> </div>
        <div className="review-sumnail">
          <strong>{props.list.category}</strong>
        </div>

        <div className="review-description">
          <div className="avg-wrap">
            <strong>사용자 총 평점</strong>
            <StarRate star_rate={props.list.star_rate}></StarRate>
            <span className="star-rate">{props.list.star_rate} / 5.0</span>
          </div>
          <div className="user-comments-wrap">
            {
              comments
              ? comments.map((item, i)=>{
                return <UserCommentBox comment={item} key={i}></UserCommentBox>
              })
              : <div>Loading...</div>
            }
          </div>
          <div className="user-textbox-wrap">
            <ReviewTextBox index={props.index} category={props.list.category}></ReviewTextBox>
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
