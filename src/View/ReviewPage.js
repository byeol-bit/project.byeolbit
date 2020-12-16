import { useState, useEffect } from 'react';
import '../css/ReviewPage.css';
import ReviewBox from '../Component/ReviewBox';
import axios from 'axios';

function ReviewPage() {
  let [_review, setReview] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:3000/api/review/category')
    .then((res)=>{
      setReview(res.data);
    })
  }, []);

  return (
    <div className="review-wrap">
      <ul>
        {
          _review
          ? _review.map((item, i)=>{
            return <ReviewBox list={item} index={i} key={i}></ReviewBox>
          })
          : <div>Loading...</div>

        }
      </ul>
    </div>
  )
}

export default ReviewPage;
