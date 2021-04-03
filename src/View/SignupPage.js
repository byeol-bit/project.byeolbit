import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/SignupPage.scss';

function SignupPage() {

  let patternNum = /[0-9]/;
  let patternEng = /[a-z]/;
  let patternSpc = /[~!@#$%^&*()_+=|<>?{};]/;
  let patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let [id, setId] = useState(null);
  let [idCheck, setIdCheck] = useState(false);
  let [pw, setPw] = useState(null);
  let [name, setName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  let [male, setMale] = useState(false);
  let [female, setFemale] = useState(false);
  let [error, setError] = useState(true);
  let [labelId, setLabelId] = useState(null);
  let [labelPw, setLabelPw] = useState(null);
  let [labelPwCheck, setLabelPwCheck] = useState(null);
  let [labelEmail, setLabelEmail] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if(phone == null) return;

    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phone.length === 13) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phone]);

  function changeId(e){
    let _id = e.target.value;

    if(patternSpc.test(_id) || patternKor.test(_id)){
      setLabelId('특수문자 또는 한글은 올 수 없습니다.');
      setId(null);
      setError(true);
      return;
    }

    if(_id.length < 4 || 16 < _id.length){
      setLabelId('올바른 아이디를 입력해 주세요.');
      setError(true);
      return;
    }

    setLabelId(null);
    setError(false);

    setId(_id);

  }
  function changePw(e){
    let _pw = e.target.value;

    if(_pw.length < 10 || 16 < _pw.length){
      setLabelPw('비밀번호는 최소 10자리입니다.');
      setError(true);
      return;
    }

    setLabelPw(null);
    setError(false);

    setPw(_pw);
  }
  function changePwCheck(e){
    if(pw !== e.target.value){
      setLabelPwCheck('비밀번호와 일치하지 않습니다.');
      return;
    }

    setLabelPwCheck(null);
  }
  function changeName(e){
    if(e.target.value.length > 10) return;

    setName(e.target.value);
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
      setError(true);
      return;
    }

    setLabelEmail(null);
    setEmail(e.target.value);
    setError(false);
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
  function btnIdCheckClick(e){
    e.preventDefault();
    var user = id;

    if(user === null) {
      alert('아이디를 입력해주세요.');
      return;
    }

    axios.get('http://3.34.57.203:3000/api/user', {params:{id:user}})
    .then((res)=>{
      if(res.data.length === 0){
        alert('사용 가능한 아이디입니다.');
        setIdCheck(true);
      }else{
        alert('이미 존재하는 아이디입니다.');
        setIdCheck(false);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  function btnSignUpClick(){
    if(error) {
      alert('정보를 정확히 입력해 주세요.');
    }

    if(id === null || pw === null || name === null || email === null || phone=== null){
      console.log(id + ',' + pw + ',' + name + ',' + email + ',' + phone);
      alert('입력하지 않은 데이터가 있습니다.');
    }

    // 중복확인을 하지 않았을 경우
    if(!idCheck){
      alert('중복 확인을 해주세요.');
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
    axios.post('http://3.34.57.203:3000/api/signup', {
      id:id,
      pw:pw,
      name:name,
      email:email,
      phone:phone,
      sex:sex})
    .then((res)=>{
      console.log(res);
      if(res.data.affectedRows === 1){
        alert('정상적으로 회원가입 되었습니다.');
        history.push('/login');
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  return (

    <div className="signup-wrap">
      <h2>회원가입</h2>
      <div className="event-wrap">
        <div></div>
      </div>
      <form className="signup-form">
        <table className="signup-table" border='1' frame='void'>
          <tr>
            <td className="column">아이디 <span>*</span></td>
            <td>
              <div>
              <input type='text' required onChange={changeId}></input>
              <button onClick={btnIdCheckClick} id="btn_idcheck">중복확인</button>
              <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelId}</label>
              <br/>
              <label>(영문소문자/숫자,4~16자)</label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="column">비밀번호 <span>*</span></td>
            <td>
              <div>
              <input type='password' required onChange={changePw}></input>
              <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelPw}</label>
              <br/>
              <label>(영문대소문자/숫자,10~16자)</label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="column">비밀번호 확인 <span>*</span></td>
            <td>
              <div>
              <input type='password' onChange={changePwCheck} required></input>
              <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelPwCheck}</label>
              <br/>
              </div>
            </td>
          </tr>
          <tr>
            <td className="column">이름 <span>*</span></td>
            <td>
              <div>
                <input type='text' value={name} onChange={changeName} required></input><br/>
              </div>
            </td>
          </tr>
          <tr>
            <td className="column">성별 <span>*</span></td>
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
            <td className="column">휴대전화 <span>*</span></td>
            <td>
              <div>
              <input type='text' value={phone} required onChange={changePhone}></input><br/>
              </div>
            </td>
          </tr>
          <tr>
            <td className="column">이메일 <span>*</span></td>
            <td>
              <div>
              <input type='text' required onChange={changeEmail}></input>
              <label style={{color:'red', fontSize:'12px', marginLeft:'5px', fontWeight:'600'}}>{labelEmail}</label>
              <br/>
              </div>
            </td>
          </tr>
        </table>
      </form>

      <div>

      </div>

      <button id='btn_signup' onClick={btnSignUpClick}>회원가입</button>
    </div>
  )
}

export default SignupPage;
