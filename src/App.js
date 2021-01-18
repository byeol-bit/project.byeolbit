/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';

//Views
import EventPage from './View/EventPage';
import NoticePage from './View/NoticePage';
import GuidePage from './View/GuidePage';
import LoginPage from './View/LoginPage';
import SignupPage from './View/SignupPage';
import MyPage from './View/MyPage';
import StorePage from './View/StorePage';
import BrandPage from './View/BrandPage';
import ReviewPage from './View/ReviewPage';
import SupportPage from './View/SupportPage';
import CartPage from './View/CartPage';
import MenuPage from './View/MenuPage';
import MainPage from './View/MainPage';
import DetailPage1 from './View/DetailPage1';

//icon
import cart from './assets/images/icon_cart.png';


function App(props) {

  useEffect(()=>{
    console.log('메인페이지');
    console.log('메인페이지 유저정보',props.user);
    element[0].style.maxHeight = window.innerHeight + "px";
  });
  useEffect(()=>{
    let token = document.cookie.split('=')[1];
    if(token === undefined || token === null) return;

    axios.post('http://localhost:3000/api/user/auth', {token:token}, {withCredentials: true})
    .then((res)=>{
      if(res.data.auth){
        console.log('메인페이지 user 요청');
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
  }, []);

  window.addEventListener('resize', ()=>{
    element[0].style.maxHeight = window.innerHeight + "px";
  });

  let element = document.getElementsByClassName('wrap');
  let [_data, setData] = useState();

  return (
    <div className="App">
      <section className="wrap">
        <h1>별빛담은</h1>
        <header>
          <section className="header-nav">
            <div className="logo_box">
              <strong><Link to="/" style={{color:'#fff'}}>별빛담은</Link></strong>
              <img src="./stamp.png"/>
            </div>

            <nav className="nav_list">
              <ul className="nav_list_top">
                <li><Link to="/event">이벤트</Link></li>
                <li><Link to="/notice">공지사항</Link></li>
                <li><Link to="/guide">이용가이드</Link></li>
                {console.log('여기요', props.user)}
                {
                  props.user.isLogin
                  ? <li><Link to="/mypage">{props.user.name}님</Link></li>
                  : <li><Link to="/login">로그인</Link></li>
                }
              </ul>

              <ul className="nav_list_bottom">
                <li><Link to="/store" style={{color:'#fff'}}>온라인스토어</Link></li>
                <li><Link to="/brandstory" style={{color:'#fff'}}>브랜드스토리</Link></li>
                <li><Link to="/review" style={{color:'#fff'}}>리뷰</Link></li>
                <li><Link to="/support" style={{color:'#fff'}}>고객센터</Link></li>
                <li><Link to="/cart"><img src={cart} style={{width:"40px", height:"40px", verticalAlign:"bottom" }}/></Link></li>
              </ul>
            </nav>
          </section>
        </header>

        <section className="container">
            <Switch>
              <Route exact path="/">
                <MainPage></MainPage>
              </Route>

              <Route path="/event">
                <EventPage></EventPage>
              </Route>

              <Route path="/notice">
                <NoticePage></NoticePage>
              </Route>

              <Route path="/guide">
                <GuidePage></GuidePage>
              </Route>

              <Route path="/login">
                <LoginPage></LoginPage>
              </Route>

              <Route path="/mypage">
                <MyPage></MyPage>
              </Route>

              <Route path="/signup">
                <SignupPage></SignupPage>
              </Route>

              <Route path="/store">
                <StorePage></StorePage>
              </Route>

              <Route path="/brandstory">
                <BrandPage></BrandPage>
              </Route>

              <Route path="/review">
                <ReviewPage></ReviewPage>
              </Route>

              <Route path="/support">
                <SupportPage></SupportPage>
              </Route>

              <Route path="/cart">
                <CartPage></CartPage>
              </Route>

              <Route path="/menu">
                <MenuPage></MenuPage>
              </Route>

              <Route path="/detail/1">
                <DetailPage1></DetailPage1>
              </Route>
            </Switch>
        </section>
      <footer>
        footer
      </footer>
      </section>
    </div>
  );
}

function stateToProps(state){
  console.log('메인페이지stateToProps', state);
  return {
    user: state.setUser
  }
}

export default connect(stateToProps)(App)
