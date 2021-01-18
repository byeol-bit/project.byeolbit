import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/StorePage.css';

//Component
import Items from '../Component/Items';


function StorePage() {

  let arr = ['전체보기', '청국장', '된장', '고추장', '간장', '장아찌'];
  let [_title, setTitle] = useState("전체보기");
  let [items, setItems] = useState([]);

  useEffect(() =>{
    console.log('온라인스토어 작동!');
    axios.get('http://localhost:3000/api/products', {})
    .then((res)=>{
      if(res.data.success){
        console.log('온라인스토어 데이터');
        setItems(res.data.list);
      }
    })
    .catch()
  }, []);

  return (
    <section className="content-wrap">
      <div className="main-photo">
        <div className="text">
          <h2>별빛담은</h2>
          <p>맑은 시골하늘의<br/>
             별빛을 담은 장</p>
        </div>
      </div>

      <div className="item-nav-wrap">
        <div className="item-nav">
          <ul>
            {
              arr.map((item, i)=> {
                return <li onClick={ ()=> { setTitle(item) } }>{item}</li>
              })
            }
          </ul>
        </div>
      </div>

      <Items list={items} title={_title} setTitle={setTitle}></Items>

    </section>
  )
}

export default StorePage;
