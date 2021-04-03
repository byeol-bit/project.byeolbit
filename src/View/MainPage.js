import { useState, useEffect } from 'react';
import '../css/MainPage.scss';
import axios from 'axios';
//Component
import Items from '../Component/Items';

function MainPage() {

  let [items, setItems] = useState([]);

  useEffect(() =>{
    console.log('메인페이지 작동!');
    axios.get('http://3.34.57.203:3000/api/best-products', {})
    .then((res)=>{
      if(res.data.success){
        console.log('메인페이지 데이터');
        setItems(res.data.list);
      }
    })
    .catch()
  }, []);
  let lastNum = items.length;
  let count = 3;
  let element = document.getElementsByClassName('bestitem');
  let btn_more = document.getElementsByClassName('btn-more');

  function buttonClick1() {
    element[0].style.height = element[0].clientHeight + 470 + "px";
    count += 3;

    if (count >= lastNum)
      btn_more[0].style.display = "none";
  }

  return (
    <section className="mainview-wrap">
      <div className="banner">
        <div><span>뭔가가 필요해~</span></div>
      </div>
      <h2>베스트 상품</h2>
      <section className="bestitem">
      {
        items
        ? <Items list={items}></Items>
        :  null
      }

      </section>
      <button className="btn-more" onClick={ buttonClick1 }>더보기</button>

    </section>
  )
}

export default MainPage;
