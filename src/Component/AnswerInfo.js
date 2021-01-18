import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setTime } from '../Model/CommonFnc.js';
import axios from 'axios';
import { connect } from 'react-redux';
import '../css/AnswerInfo.scss';

function AnswerInfo(props) {

  let popupDelete = document.getElementsByClassName('popup_btntwo_wrap')[0];
  let popupError = document.getElementsByClassName('popup_btnone_wrap')[0];
  let [answerList, setAnswerList] = useState();
  let [selectFlag, setSelectFlag] = useState(false);
  let selectedList = [];

  function selectAll(){
    let selected = document.getElementsByClassName('chk_inquiry');

    if(selectFlag){
      for(let i = 0; i < selected.length; i++){
          selected[i].checked = false;
      }
      selectedList = [];
      setSelectFlag(false);
    }else{
      for(let i = 0; i < selected.length; i++){
          selected[i].checked = true;
          if(!selectedList.includes(answerList[i].inquiry_no))
            selectedList.push(answerList[i].inquiry_no);
      }
      setSelectFlag(true);
    }

    console.log(selectedList);
  }
  function messageClick(e){
    console.log(e.target);

  }
  function btndeleteClick(e){
    let selected = document.getElementsByClassName('chk_inquiry');

    let checkFlag = false;
    for(let i = 0; i < selected.length; i++){
      if(selected[i].checked) checkFlag = true;
    }

    if(!checkFlag){
      popupError.style.display = "block";
      return;
    }
    popupDelete.style.display = "block";
  }
  function chkInquiryChange(e, answer){
    if(e.target.checked){
      if(!selectedList.includes(answer.inquiry_no)){
        selectedList.push(answer.inquiry_no);
      }
    }else{
      if(selectedList.includes(answer.inquiry_no)){
        selectedList.splice(selectedList.indexOf(answer.inquiry_no),1);
      }
    }
  }
  function initializeList(answer){

    return (
      <tr>
        <td><input className="chk_inquiry" type="checkbox" onChange={(e)=>{chkInquiryChange(e, answer)}}/></td>
        <td>{answer.inquiry_no}</td>
        <td>{setTime(answer.inquiry_create_date)}</td>
        <td>{setCategory(answer.category)}</td>
        <td onClick={messageClick} style={{textAlign:"left", paddingLeft:"20px"}}>{answer.inquiry_msg}</td>
        <td>{setStatus(answer.answer_status)}</td>
        <td>{setAnswerDate(answer.answer_create_date)}</td>
      </tr>
    )
  }
  function setCategory(category) {
    let result = '';
    if(category == 'product'){
      result = '상품관련';
    }else if(category == 'order'){
      result = '주문/결제';
    }else if(category == 'shipment'){
      result = '배송';
    }else if(category == 'refund'){
      result = '취소/교환/환불';
    }else if(category == 'ect'){
      result = '기타';
    }

    return result;
  }
  function setStatus(status){
    let result = '대기';

    if(status){
      result = '답변완료';
    }else{
      result = '대기';
    }

    return result;
  }
  function setAnswerDate(date){
    if(date === null){
      return '-';
    }else{
      return date;
    }
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/api/inquiry', {params:{id:props.user.id}})
    .then((res)=>{
      if(res.data.success){
        setAnswerList(res.data.list);
      }
    })
    .catch()
  }, []);

  return (
    <div className="answer_wrap">
      <button className="btn_delete_inquiry" onClick={selectAll}>전체선택</button>
      <button className="btn_delete_inquiry" onClick={btndeleteClick}>삭제</button>
      <table className="answer_table">
        <th><div style={{width:"40px"}}></div></th>
        <th>번호</th>
        <th>작성일</th>
        <th>카테고리</th>
        <th>문의내용</th>
        <th>답변여부</th>
        <th>답변일</th>
        {console.log(answerList)}
        {
          answerList
          ? (
            answerList.map((answer, i)=>{
              return initializeList(answer);
            })
          )
          : null
        }
      </table>

      {
        answerList
        ? null
        : <div style={{padding:"10px 30px 10px 30px", background:"#F7D358", textAlign:"center", borderRadius:"10px", width:"500px", margin:"20px 0 0 200px", color:"##FAFAFA"}}>
          문의내역이 없습니다.
          </div>
      }

      <Modal popup={popupDelete} list={selectedList}></Modal>
      <PopUpError popup={popupError}></PopUpError>
    </div>
  )
}

function Modal(props) {

  function deleteInquiry(){
    axios.post('http://localhost:3000/api/inquiry/delete', {list:props.list})
    .then((res)=>{
      if(res.data.success){
        console.log('삭제성공');
        props.popup.style.display = "none";
      }else{
        console.log('삭제실패');
        props.popup.style.display = "none";
      }
    })
    .catch()
  }
  function btnCancleClick(){
    props.popup.style.display = "none";
  }

  return (
    <div className="popup_btntwo_wrap">
      <section>
        <h1>문의내역</h1>
        <p>해당 문의사항을 정말 삭제 하시겠습니까?</p>
        <button onClick={deleteInquiry}>삭제</button>
        <button onClick={btnCancleClick}>취소</button>
      </section>
    </div>
  )
}

function PopUpError(props) {

  function btnOkClick(){
    props.popup.style.display = "none";
  }

  return (
    <div className="popup_btnone_wrap">
      <section>
        <h1>문의내역</h1>
        <p>삭제할 데이터를 선택해주세요.</p>
        <button onClick={btnOkClick}>확인</button>
      </section>
    </div>
  )
}

function stateToProps(state){
  return {
    user:state.setUser
  }
}
export default connect(stateToProps)(AnswerInfo)
