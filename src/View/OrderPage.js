import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import '../css/OrderPage.scss';
import cart from '../assets/images/icon_cart(big).png';
import { onlyNumber, setComma } from '../Model/CommonFnc';


function OrderPage(props) {

  const inputRef = useRef(null);

  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [agree, setAgree] = useState(false);
  const procList = props.orderList;
  const [orderList, setOrderList] = useState([]);
  const [useEffectFlag, setUseEffectFlag] = useState(true);

  // const instance = useRef(null);


  useEffect(()=>{
    if(!useEffectFlag) return;

    console.log('flag', useEffectFlag);
    axios.get('http://3.34.57.203:3000/api/products', null)
    .then((res)=>{
      if(res.data.success){
        let temp = [];
        for(let i = 0; i < procList.length; i++){
          for(let j = 0; j < res.data.list.length; j++){
            if(res.data.list[j].product_no === procList[i].procNo){
              res.data.list[j].product_count = procList[i].procCount;
              res.data.list[j].product_price = res.data.list[j].product_price.replace(',', '');
              res.data.list[j].product_price = res.data.list[j].product_price.replace('원', '');
              res.data.list[j].product_price = Number(res.data.list[j].product_price);
              temp.push(res.data.list[j]);
            }

          }
        }
        setOrderList(temp);
        setUseEffectFlag(false);
      }
    })
    .catch()
  }, [useEffectFlag]);

  // useEffect(()=>{
  //  instance.current =
  // }, []);

  function checkedSameInfo(e){
    console.log(document.getElementById('oname').value);
    if(document.getElementById('oname').value === "" && document.getElementById('ophone1').value === ""
      && document.getElementById('ophone2').value === "" && document.getElementById('ophone3').value === "") {
      alert("주문자 정보를 입력해주세요.");
      e.target.checked = false;
      return;
    }

    if(e.target.checked === false) {
      // name
      document.getElementById('rname').value = "";
      // phone
      document.getElementById('rphone1').value = "";
      document.getElementById('rphone2').value = "";
      document.getElementById('rphone3').value = "";

      return;
    }

    // name
    document.getElementById('rname').value = document.getElementById('oname').value;
    // phone
    document.getElementById('rphone1').value = document.getElementById('ophone1').value;
    document.getElementById('rphone2').value = document.getElementById('ophone2').value;
    document.getElementById('rphone3').value = document.getElementById('ophone3').value;
  }
  function changeEmail(e) {
    let email = document.getElementById('email_last');

    email.value = e.target.value;

    if(e.target.value === ""){
      email.style.background = "#fff";
      email.disabled = false;
      console.log(email.disabled);
    }else{
      email.style.background = "#eee";
      email.disabled = true;
    }
  }

  return (
    <div className="order_wrap">
      <h1>주문결제</h1>
      <div className="cart_tab">
        <div id="cart_left_title">주문서 / 결제</div>
        <div id="cart_right_title">01장바구니 &gt; <span>02주문/결제 </span>&gt; 03주문완료</div>
      </div>

      <div style={{fontSize:"11px", color:"#4f4f4f", padding:"10px 2px", textAlign:"left"}}>* 제품의 품절로 상품발송이 부득이하게 이루어지지 못하는 경우가 있으므로 이점 미리 양해해주시기 바랍니다. 빠른 배송을 위해 최선을 다하겠습니다.</div>
      <div>
        <table className="cart_table_top" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td width="53px"></td>
              <td width="640px">상품명</td>
              <td width="120px">상품금액</td>
              <td width="60px">수량</td>
              <td width="120px">주문금액</td>
              <td width="103px">쿠폰</td>
              <td width="60px">삭제</td>
            </tr>
          </tbody>
        </table>
      </div>
      {console.log('orderList', orderList)}
      {
        orderList
        ? orderList.map((item, i)=>{return <OrderList item={item}></OrderList>})
        : null
      }

      <div className="order_info_wrap">
        <div className="order_title_top">
          주문자정보
        </div>

        <div className="order_info_table">
          <table cellpading="0" cellspacing="0">
            <tbody>
              <tr height="30px">
                <td width="130px">이름</td>
                <td><input type="text" id="oname"></input></td>
              </tr>
              <tr height="30px">
                <td width="130px">이메일</td>
                <td>
                  <div>
                    <input type="text" id="email_first"/><span style={{fontWeight:"normal"}}> @ </span><input type="text" id="email_last"/>
                    <select id="email_dot" name="email_dot" onChange={changeEmail}>
                      <option value="" selected>직접입력</option>
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="hotmail.com">hotmail.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="yahoo.com">yahoo.com</option>
                      <option value="nate.com">nate.com</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr height="30px">
                <td width="130px">연락처</td>
                <td><input className="txt-phone" type="text" id="ophone1" onChange={onlyNumber} maxlength='3'/> - <input className="txt-phone" type="text" id="ophone2" onChange={onlyNumber} maxlength='4'/> - <input className="txt-phone" type="text" id="ophone3" onChange={onlyNumber} maxlength='4'/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="order_info_wrap">
        <div className="order_title_top">
          <span>배송정보</span>
          <label id="same-info"><input type="checkbox" onChange={checkedSameInfo}/>위 주문정보와 동일</label>
        </div>

        <div className="order_info_table">
          <table cellpading="0" cellspacing="0">
            <tbody>
              <tr height="30px">
                <td width="130px">이름</td>
                <td><input type="text" id="rname"></input></td>
              </tr>

              <tr height="30px">
                <td width="130px">연락처</td>
                <td><input className="txt-phone" type="text" id="rphone1" onChange={onlyNumber} maxlength='3'/> - <input className="txt-phone" type="text" id="rphone2" onChange={onlyNumber} maxlength='4'/> - <input className="txt-phone" type="text" id="rphone3" onChange={onlyNumber} maxlength='4'/></td>
              </tr>

              <tr height="70px">
                <td width="130px">주소</td>
                <td>
                  <div>
                    <input id="addr_code" type="text" value={isZoneCode} disabled/>
                    <button id="btn_address">우편번호</button>
                  </div>
                  <div>
                    <input id="addr_main" type="text" value={isAddress} disabled/>
                    <input id="addr_detail" type="text" ref={inputRef}/>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <table className="cart_table_bottom">
        <tbody>
          <tr height="68px">
            <td width="267px">상품금액</td>
            <td width="267px">추가금액(배송비)</td>
            <td width="267px">총 할인금액</td>
            <td>총 결제금액</td>
          </tr>
          <tr style={{fontSize:"20px", fontFamily:"nt-M", fontWeight:"500"}}>
          <td><span id="cart_item_price">0</span>원</td>
          <td><div style={{fontSize:"14px", color:"#afafaf"}}>주문결제페이지에서<br/>확인가능합니다.</div></td>
          <td><span>0</span>원</td>
          <td style={{fontWeight:"700"}}><span id="cart_final_price">0</span>원</td>
          </tr>
        </tbody>
      </table>


      <div className="order_agree_wrap">
        <div className="order_agree_top">
          주문자 동의
        </div>
        <table cellpading="0" cellspacing="0" className="order_agree_table">
          <tbody>
            <tr>
              <td width="130px"><div className="at-txt-1">약관동의</div></td>
              <td>
                <div className="new_privercy_contract">
                  <p>개인정보 수집·이용</p>
                  <div className="privercy_contract">
                    <table>
                      <caption>개인정보 수집/이용</caption>
                      <colgroup>
                        <col width="*"/>
                        <col width="30%"/>
                        <col width="20%"/>
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">목적</th>
                          <th scope="col">항목</th>
                          <th scope="col">보유기간</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span style={{margin:"5px"}}>서비스 제공(요금정산, 콘텐츠 제공, 구매 및 요금결제, 물품배송, 금융거래 본인 인증 및 금융서비스)</span>
                          </td>
                          <td>
                            <span style={{margin:"5px"}}>구매자 정보(이름, 연락처, 이메일),수취인 정보(이름, 연락처, 주소</span>
                          </td>
                          <td>
                            <span style={{margin:"5px"}}><strong>주문일로 부터 90일까지(관계 법령에 따라 필요 시,일정기간 보유)</strong></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{marginTop:"5px"}}>
                      * 동의하셔야 서비스를 이용하실 수 있습니다.
                    </div>
                    <div className="privercy_agree">
                      <label>
                        <input type="radio" name="agreePrivacy" value={agree} onClick={()=>setAgree(true)}/>
                        정보수집에 동의합니다.
                      </label>
                      <label style={{marginLeft:"7px"}}>
                        <input type="radio" name="agreePrivacy" checked onClick={()=>setAgree(false)}/>
                          동의하지 않습니다.
                      </label>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td><div className="at-txt-1">주문동의</div></td>
              <td>
                <label><input type="checkbox"/>상기 결제정보를 확인하였으며, 구매진행에 동의합니다.</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{marginTop:"20px"}}>
        <button id="btn_order">주문하기</button>
        <button id="btn_cancle_order">주문취소</button>
      </div>
    </div>
  )
}

function OrderList(props) {
  var [procCount, setProcCount] = useState(0);
  var [procPrice, setProcPrice] = useState(0);

  useEffect(()=>{
    setProcCount(props.item.product_count);
    setProcPrice(props.item.product_price);
  }, []);

  const cartTableListStyle = {
    width: "1160px",
    textAlign: "center",
    borderBottom: "1px solid #c8c8c8",
  }

  const inputCountStyle = {
    width: "50px",
    textAlign: "center",
    border: "1px solid #c8c8c8",
    borderRadius: "5px",
  }

  return (
    <div>
      <table style={cartTableListStyle} className="cart_table_list" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr height="90px">
            <td width="53px"></td>
            <td width="640px">
              <div style={{textAlign:"left", marginLeft:"60px"}}>
                <img src="" style={{width:"50px", height:"50px", backgroundSize:"contain", verticalAlign:"middle", marginRight:"30px"}}/>
                {props.item.product_subname}
              </div>

            </td>
            <td width="120px"><div style={{textAlign:"right", marginRight:"15px"}}>{setComma(procPrice)}원</div></td>
            <td width="60px">{procCount}</td>
            <td width="120px"><div style={{textAlign:"right", marginRight:"15px"}}>{setComma(procPrice*procCount)}원</div></td>
            <td width="103px">쿠폰</td>
            <td width="60px">삭제</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function stateToProps(state){
  return {
    user : state.setUser,
    orderList : state.setOrderList
  }
}
export default connect(stateToProps)(OrderPage);
