import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import '../css/InquiryInfo.scss';

function InquiryInfo(props) {

  let history = useHistory();
  let [message, setMessage] = useState(null);

  function btnInquiryClick(){
    let cbxValue = document.getElementsByClassName('cbx_wrap');
    if(cbxValue[0].value === 'none'){
      alert('카테고리를 선택해 주세요.');
      return;
    }


    axios.post('http://localhost:3000/api/inquiry/add',
    {
      id:props.user.id,
      category:cbxValue[0].value,
      message:message
    })
    .then((res)=>{
      if(res.data.success){
        alert('문의가 접수되었습니다.');
        history.push('/mypage/answer');
      }
    })
    .catch()
  }

  return (
    <div className="inquiry_wrap">
      <h3>1:1 문의</h3><br/>
      <form>
        <div>
          <label className="lbl_inquiry">카테고리</label>
          <select className="cbx_wrap">
            <option value="none">=======선택=======</option>
            <option value="product">상품관련</option>
            <option value="order">주문/결제</option>
            <option value="shipment">배송</option>
            <option value="refund">취소/교환/환불</option>
          </select>
        </div><br/>
        <div>
          <label className="lbl_inquiry">문의내용</label>
          <span className="textbox">
            <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name='message' id='msg_inquiry' required placeholder='문의사항을 적어주세요.'/>
          </span>
        </div>

        <button id="btn_inquiry" onClick={btnInquiryClick}>문의하기</button>
      </form>
    </div>
  )
}



function stateToProps(state){
  return {
    user : state.setUser
  }
}
export default connect(stateToProps)(InquiryInfo)
