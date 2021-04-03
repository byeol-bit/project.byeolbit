import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import '../css/LoginPage.scss';

// axios.defaults.withCredentials = true;

function LoginPage(props) {

  let [id, setId] = useState(null);
  let [pw, setPw] = useState(null);
  let history = useHistory();

  function btnLogin(e){
    if(id === null || pw === null) return;

    e.preventDefault();

    axios.post('http://3.34.57.203:3000/api/user/login', {id:id, pw:pw}, {withCredentials: true})
    .then((res)=>{
      if(!res.data.success){
        alert('존재하지 않는 아이디입니다.');
      }else{
        alert('로그인 성공!');
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
        history.push('/');
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  function btnOrder() {
    history.push('/order');
  }

  return (
    <div className="login-wrap">
      <form className="login-form" novalidate>
        <div id="user-id">
          <input type="text" name="uid" placeholder="아이디" required autocomplete='off' onChange={(e)=>{setId(e.target.value)}}/>
        </div>

        <div id="user-pw">
          <input type="password" name="upw" placeholder="비밀번호" required onChange={(e)=>{setPw(e.target.value)}}/>
        </div>
        <button onClick={btnLogin}>로그인</button>
      </form>

      <div>
        <p>
          <span id='find-id'>아이디/비밀번호 찾기</span>
          <span> | </span>
          <Link to='/signup' style={{color:'#000'}}><span id='sign-up'>회원가입</span></Link>
        </p>
      </div>

      <div className="other-login">
        <span>SNS로 간편 로그인 · 회원가입</span>
      </div>

      <div className="non-user-order">
        <button onClick={btnOrder}>비회원 주문하기</button>
      </div>
    </div>
  )
}

function stateToProps(state){
  return {
    user : state.setUser
  }
}
export default connect(stateToProps)(LoginPage);
