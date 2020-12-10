/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

//Views
import EventPage from './View/EventPage';
import NoticePage from './View/NoticePage';
import GuidePage from './View/GuidePage';
import LoginPage from './View/LoginPage';
import SignupPage from './View/SignupPage';
import StorePage from './View/StorePage';
import BrandPage from './View/BrandPage';
import ReviewPage from './View/ReviewPage';
import SupportPage from './View/SupportPage';
import CartPage from './View/CartPage';
import MenuPage from './View/MenuPage';
import MainPage from './View/MainPage';

function App() {

  useEffect(()=>{
    element[0].style.maxHeight = window.innerHeight + "px";
  });
  window.addEventListener('resize', ()=>{
    element[0].style.maxHeight = window.innerHeight + "px";
  });
  let element = document.getElementsByClassName('wrap');

  return (
    <div className="App">
      <section className="wrap">
        <h1>별빛담은</h1>
        <header>
          <section className="header-nav">
            <div className="logo_box">
              <strong><Link to="/">별빛담은</Link></strong>
              <img src="./stamp.png"/>
            </div>

            <nav className="nav_list">
              <ul className="nav_list_top">
                <li><Link to="/event">이벤트</Link></li>
                <li><Link to="/notice">공지사항</Link></li>
                <li><Link to="/guide">이용가이드</Link></li>
                <li><Link to="/login">로그인</Link></li>
                <li><Link to="/signup">회원가입</Link></li>
              </ul>

              <ul className="nav_list_bottom">
                <li><Link to="/store">온라인스토어</Link></li>
                <li><Link to="/brandstory">브랜드스토리</Link></li>
                <li><Link to="/review">리뷰</Link></li>
                <li><Link to="/support">고객센터</Link></li>
                <li><Link to="/cart">장바구니</Link></li>
                <li><Link to="/menu">메뉴</Link></li>
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

        </Switch>
        </section>
      <footer>
        footer
      </footer>
      </section>
    </div>
  );
}

export default App;
