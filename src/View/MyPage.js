import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import '../css/MyPage.scss'

import UserInfo from '../Component/UserInfo.js';
import InquiryInfo from '../Component/InquiryInfo.js';
import AnswerInfo from '../Component/AnswerInfo.js';



function MyPage(props) {

  useEffect(()=>{
      console.log('마이페이지');
      let token = document.cookie.split('=')[1];
      if(token === undefined || token === null) history.push('/');

      axios.post('http://localhost:3000/api/user/auth', {token:token}, {withCredentials: true})
      .then((res)=>{
        if(res.data.auth){
          console.log('마이페이지 user 요청');
          let user = {
            isLogin: true,
            id:res.data.user.id,
            name:res.data.user.name,
            profile:res.data.user.profile,
            phone:res.data.user.phone,
            sex:res.data.user.sex,
            email:res.data.user.email
          };

          props.dispatch({type:'initializeUser', payload:user});
        }else{
          // 권한이 없을경우
        }
      })
      .catch()
  },[]);

  let history = useHistory();

  function onClickNav(e){
    var element = document.getElementsByClassName('nav_mypage')[0];
    for(let i = 0; i < element.childElementCount; i++){
      element.children[i].firstChild.classList.remove('on');
    }
    e.target.classList.add('on');
  }
  function onClickLogout(){
    axios.post('http://localhost:3000/api/user/logout', {})
    .then((res) =>{
      console.log(res.data);
      if(res.data.success){
        let user = {
          isLogin: false,
          id:null,
          name:null,
          profile:null,
          phone:null,
          sex:null,
          email:null
        };

        props.dispatch({type:'initializeUser', payload:user});
        history.push('/');
      }
    })
    .catch()
  }


  return (
    <div className="mypage_wrap">
      <div className="mypage_user_wrap">
        <img src={props.user.profile}/>
        <label>{props.user.name}님</label>
      </div>

      <button id="btn_logout" onClick={onClickLogout}>로그아웃</button>

      <div className="nav_mypage_wrap">
        <ul className="nav_mypage">
          <li onClick={onClickNav}><Link to="/mypage/order">주문내역</Link></li>
          <li onClick={onClickNav}><Link to="/mypage/inquiry">1:1문의</Link></li>
          <li onClick={onClickNav}><Link to="/mypage/answer">문의내역</Link></li>
          <li onClick={onClickNav}><Link to="/mypage/setting">계정</Link></li>
        </ul>
      </div>

      <Switch>


        // 주문내역
        <Route path="/mypage/order">
          <table>
            <th>#</th>
            <th>사진</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </table>
        </Route>

        // 계정
        <Route path="/mypage/setting">
          <UserInfo></UserInfo>
        </Route>

        // 1:1 문의
        <Route path="/mypage/inquiry">
          <InquiryInfo></InquiryInfo>
        </Route>

        // 문의내역
        <Route path="/mypage/answer">
          <AnswerInfo></AnswerInfo>
        </Route>

        //
        <Route path="">
        </Route>
      </Switch>
    </div>
  )
}

function stateToProps(state){
  return {
    user : state.setUser
  }
}
export default connect(stateToProps)(MyPage)
