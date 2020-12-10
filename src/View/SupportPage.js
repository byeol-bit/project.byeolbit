import React, { useState } from 'react';
import '../css/SupportPage.css';
import datalist from '../tempDataFolder/support_list.js';
import Accordion from '../Component/Accordion.js';

function SupportPage() {

  let [active, setActive] = useState();
  let arr = ['상품관련', '주문/결제', '배송', '취소/교환/환불'];
  let [_title, setTitle] = useState("상품관련");


  return (
    <section className="supview-wrap">
      <div className="title">
        <h2>고객센터</h2>
        <p>문의 전 <span>자주 묻는 질문</span>을 확인해 주세요! <br/>
        쉽고 빠르게 원하는 내용을 찾아보고 문의를 해결할 수 있습니다.</p>
        <button>1:1 문의하기</button>
      </div>

      <section className="content_wrap">

        <div className="nav">
          <h3 className="tit_faq">
            <strong>자주 묻는 질문</strong>
            <ul>
              {
                arr.map((item, i) => {
                  return <li onClick={ ()=>{ setTitle(item) } }>{item}</li>;
                })
              }
            </ul>
          </h3>
        </div>

        {
          datalist.map((data, i) => {
            if(data.title === _title) {return <Accordion data={data} active={active} setActive={setActive}></Accordion>}
            else {return null}
          })
        }

      </section>
    </section>
  )
}

export default SupportPage;
