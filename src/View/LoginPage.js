import { useState } from 'react';
import '../css/LoginPage.scss';

function LoginPage() {

  let [id, setId] = useState(null);
  let [pw, setPw] = useState(null);

  return (
    <div className="login-wrap">
      <form className="login-form" novalidate>
        <div id="user-id">
          <input type="text" name="uid" placeholder="아이디" required onChange={(e)=>{setId(e.target.value)}}/>
        </div>

        <div id="user-pw">
          <input type="text" name="upw" placeholder="비밀번호" required onChange={(e)=>{setPw(e.target.value)}}/>
        </div>
        <button>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage;
