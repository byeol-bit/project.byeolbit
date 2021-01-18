import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/UserInfo.scss';
import { connect } from 'react-redux';
import axios from 'axios';

function UserInfo(props){

  let [pw, setPw] = useState(null);
  let [newPw, setNewPw] = useState(null);
  let [email, setEmail] = useState(props.user.email);
  let [phone, setPhone] = useState(props.user.phone);
  let [male, setMale] = useState(false);
  let [female, setFemale] = useState(false);
  let [labelPw, setLabelPw] = useState(null);
  let [labelPwCheck, setLabelPwCheck] = useState(null);
  let [labelEmail, setLabelEmail] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if(props.user.sex === 'male'){
      setMale(true);
    }else{
      setFemale(true);
    }
    if(phone){
      if (phone.length === 10) {
        setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (phone.length === 13) {
        setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
    }

  }, [phone]);

  function changePw(e){
    setPw(e.target.value);
  }
  function changeNewPw(e){
    let _pw = e.target.value;

    if(_pw.length < 10 || 16 < _pw.length){
      setLabelPw('비밀번호는 최소 10자리입니다.');
      return;
    }

    setLabelPw(null);

    setNewPw(_pw);
  }
  function changeNewPwCheck(e){
    if(newPw !== e.target.value){
      setLabelPwCheck('비밀번호와 일치하지 않습니다.');
      return;
    }

    setLabelPwCheck(null);
  }
  function changePhone(e){
    let regex = /^[0-9\b-]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  }
  function changeEmail(e){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    if(!regex.test(e.target.value)){
      setLabelEmail('이메일 양식에 맞지 않습니다.');
      setEmail(null);
      return;
    }

    setLabelEmail(null);
    setEmail(e.target.value);
  }
  function changeSex(e){
    if(e.target.value === 'male') {
      setMale(true);
      setFemale(false);
    }
    else {
      setMale(false);
      setFemale(true);
    }
  }
  function btnModifyClick(e){
    e.preventDefault();

    if( pw === null || email === null || phone=== null){
      alert('입력하지 않은 데이터가 있습니다.');
      console.log('pw, email, phone : ' , `${pw}, ${email}, ${phone}`);
    }

    // 성별 체크
    var sex = null;
    if(male === false && female === false){
      alert('성별을 선택해주세요.');
    }else{
      if(male){
        sex = 'male';
      }else{
        sex = 'female';
      }
    }

    axios.post('http://localhost:3000/api/user/modify',
    {
      id:props.user.id,
      pw:pw,
      newPw:newPw,
      sex:sex,
      phone:phone,
      email:email
    }, {withCredentials:true})
    .then((res)=>{
      if(res.data.success) history.push('/mypage/setting');
      console.log('잘나오니???',res.data.user);
    })
    .catch()


  }

  return (
    <form className="signup-form">
      <table className="signup-table" border='1' frame='void'>
        <tr>
          <td className="column">아이디</td>
          <td>
            <div>
            <label>{props.user.id}</label>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">현재 비밀번호 <span>*</span></td>
          <td>
            <div>
            <input type='password' required onChange={changePw}></input>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">새 비밀번호</td>
          <td>
            <div>
            <input type='password' onChange={changeNewPw}></input>
            <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelPw}</label>
            <br/>
            <label>(영문대소문자/숫자,10~16자)</label>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">비밀번호 확인</td>
          <td>
            <div>
            <input type='password' onChange={changeNewPwCheck}></input>
            <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelPwCheck}</label>
            <br/>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">이름</td>
          <td>
            <div>
              <label>{props.user.name}</label>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">성별</td>
          <td>
            <div>
              <label className="lbl_sex">남성</label>
              <input type='checkbox' className="chk_sex" id="chk_male" value="male" checked={male} onChange={changeSex}></input>
              <label className="lbl_sex">여성</label>
              <input type='checkbox' className="chk_sex" value="female" checked={female} onChange={changeSex}></input>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">휴대전화</td>
          <td>
            <div>
            <input type='text' value={phone} required onChange={changePhone}></input><br/>
            </div>
          </td>
        </tr>
        <tr>
          <td className="column">이메일</td>
          <td>
            <div>
            <input type='text' required value={email} onChange={changeEmail}></input>
            <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelEmail}</label>
            <br/>
            </div>
          </td>
        </tr>
      </table>

      <button id="btn_modify" onClick={btnModifyClick}>수정하기</button>
    </form>
  )
}

function stateToProps(state){
  return {
    user : state.setUser
  }
}
export default connect(stateToProps)(UserInfo)
