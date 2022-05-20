import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/DetailPage.scss';
import testimg from '../assets/images/test-img.png';
import cnt_bg2 from '../assets/images/cnt_bg2.png';
import product_detail from '../assets/images/product_detail.jpg';


function DetailPage1(props){

  let history = useHistory();
  let [orderCount, setOrderCount] = useState(1);

  function btnCartClick() {
    var cartid = localStorage.getItem('cartid');
    var procCount = orderCount;

    let userid = 'user01';
    if(props.user.isLogin) userid = props.user.id;


    if(cartid === null){
      axios.post('http://3.34.57.203:3000/api/cart/add', {userid:userid})
      .then((res)=>{
        if(res.data.success){
          localStorage.setItem('cartid', res.data.cartid);
          cartid = localStorage.getItem('cartid');

          axios.post('http://3.34.57.203:3000/api/cart_detail/add',
            {
              cartId:cartid,
              procNo:1,
              procName:'별빛담은 청국장',
              procPrice:'3500',
              procCount:procCount
            })
          .then((res)=>{
            if(res.data.success){
              var saveCart = window.confirm('장바구니에 추가되었습니다. 이동하시겠습니까?');

              if(saveCart){
                history.push("/cart");
              }else{

              }
            }else{

            }

          })
          .catch()
        }
        else{

        }
      })
      .catch()
    }else{
      axios.post('http://3.34.57.203:3000/api/cart_detail/add',
        {
          cartId:cartid,
          procNo:1,
          procName:'별빛담은 청국장',
          procPrice:'3500',
          procCount:procCount
        })
      .then((res)=>{
        if(res.data.success){
          var saveCart = window.confirm('장바구니에 추가되었습니다. 이동하시겠습니까?');

          if(saveCart){
            history.push("/cart");
          }else{

          }
        }else{

        }
    })
    .catch()
    }
  }
  function btnBuyClick() {
    console.log(props.user);
    if(props.user.isLogin){
      props.dispatch({type:'setList' ,payload:[{procNo:1, procCount:orderCount}]});
      // 구매사이트로 이동
      history.push('/order');
    }else{
      props.dispatch({type:'setList' ,payload:[{procNo:1, procCount:orderCount}]});
      // 로그인 && 비회원 구매사이트로 이동
      history.push('/login');
    }
  }
  function btnUpClick() {
    if(orderCount >= 99) return;

    setOrderCount(orderCount+1);
  }
  function btnDownClick(e) {
    if(orderCount <= 1) return;

    setOrderCount(orderCount-1);
  }
  function btnCountChange(e) {
    e.target.value=e.target.value.replace(/[^0-9]/g,'');

    if(e.target.value > 99) e.target.value = 99;
    if(e.target.value < 1) e.target.value = 1;

    setOrderCount(Number(e.target.value));
  }


  return (
    <div className="detail_wrap">
      <table className="detail_table_top" cellpadding="0" cellspacing="0">
        <tbody>
          <tr height="15px"><td></td></tr>
          <tr>
            <td width="1160px">
              모두의컴퓨터
              <span style={{color:"blue"}}>가정용 / 멀티미디어용</span>
            </td>
          </tr>
          <tr height="10px"><td></td></tr>
        </tbody>
      </table>

      <table className="detail_table_middle" cellpadding="0" cellspacing="0">
        <tbody>
          <tr height="670px">
            <td width="550px">
              <div>
                <img src={testimg}/>
              </div>
            </td>
            <td width="110px"></td>
            <td width="500px" valign="top">
              <table className="detail_table_inside" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr height="40px">
                    <td width="155px">판매가</td>
                    <td><div style={{float:"left"}}>3,500원</div></td>
                  </tr>
                  <tr height="40px">
                    <td>제조사</td>
                    <td>별빛담은</td>
                  </tr>
                  <tr height="40px">
                    <td>상품코드</td>
                    <td>2564039817</td>
                  </tr>
                  <tr height="40px">
                    <td>혜택</td>
                    <td>2021년 01월 무이자 할부안내</td>
                  </tr>
                  <tr height="40px">
                    <td>택배정보</td>
                    <td>택배(평군 1.0일 : 결제 완료 후)</td>
                  </tr>
                  <tr height="40px">
                    <td>주문수량</td>
                    <td style={{position:"relative"}}>
                      <input id="cbx_order" type="text" value={orderCount} onChange={btnCountChange}/>
                      <img src={cnt_bg2} style={{zIndex:"10"}}/>
                      <button className="btnUpCount" onClick={btnUpClick}> </button>
                      <button className="btnDownCount" onClick={btnDownClick}> </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="money_wrap">
                <span>총 결제금액 : </span>
                <div style={{float:"right", fontWeight:"bold"}}>
                  <span>3,500</span>원
                </div>
              </div>

              <div className="detail_btn_wrap">
                <button className="btn_detail"><span>🤍관심상품</span></button>
                <button className="btn_detail" onClick={btnCartClick}>장바구니</button>
                <button className="btn_detail red" onClick={btnBuyClick}>바로구매</button>
              </div>
/*
              <div style={{height:"90px", padding:"10px 0"}}></div>
              <div className="detail_review_wrap">
                <div className="detail_review_top">실시간 구매후기!</div>
                <div className="detail_roll">
                  <ul>
                    <li>h1</li>
                    <li>h2</li>
                    <li>h3</li>
                    <li>h4</li>
                  </ul>
                </div>
              </div>
*/
            </td>
          </tr>
        </tbody>
      </table>

      <div className="detail_item_info">
        <table id="item_nav_1"></table>
        <div>
          <img src={product_detail}/>
        </div>
        <table id="item_nav_2"></table>
        <div style={{height:"200px"}}></div>
        <table id="item_nav_3"></table>
        <div style={{height:"200px"}}></div>
        <table id="item_nav_4"></table>
        <table id="item_info_4" cellpadding="0" cellspacing="0" border="0" align="center">
          <tbody>
            <tr>
              <td style={{fontWeight:"bold", background:"#f5f5f5", padding:"10px 20px", fontSize:"16px"}}>배송</td>
            </tr>
            <tr height="20px"><td></td></tr>
            <tr>
              <td style={{paddingLeft:"30px"}}>
                <p align="left">
                  <strong><br/>배송 지역 </strong>
                  : 전국(일부지역 제외)
                </p>
                <p align="left">
                  <strong><br/>배송 기간 </strong>
                  : 입금완료일로 부터 1~2일이내 배송됩니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -공휴일은 배송기간에 포함이 되지 않습니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -도서/산간 지역은 2~3일 정도 지연될수 있습니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -불가항력적 사유(일시품절,천재지변 등)로 배송이 늦어질 수 있습니다.
                </p>
                <p align="left">
                  <strong><br/>배송방법 </strong>
                  1. 로젠택배(TEL: 1588-9988 / https://www.ilogen.com ) : BOX당 요금 2,500~3,000원<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  2. 퀵 서비스(TEL : 1899-3060) : 착불로 발송(2BOX 이상 다마스로 발송)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  3. 방문수령(TEL : 010-5026-4865) : 사전 연락후 방문 가능
                </p>
                <p align="left">
                  <strong><br/>유의 사항</strong>
                  : 부피나 중량이 큰 제품은 배송 방법이 변경될 수 있으며 추가 운임비가 발생할수 있습니다.
                </p>
                <br/>
              </td>
            </tr>
            <tr height="30px"><td></td></tr>
            <tr>
              <td style={{fontWeight:"bold", background:"#f5f5f5", padding:"10px 20px", fontSize:"16px"}}>교환/환불</td>
            </tr>
            <tr height="20px"><td></td></tr>
            <tr>
              <td style={{paddingLeft:"30px"}}>
                <p align="left">
                  <strong><br/>교환 및 반품이 가능한 경우 </strong><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -제품 구입 후 7일 이내의 초기불량일 경우 무상 반품 및 교환이 가능합니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -미개봉한 제품중 변심에 의한 반품의 경우에도 7일 이내에 신청해 주셔야 합니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -단순변심의 경우 환불/교환시 택배비 본인부담<br/>
                </p>
                <p align="left">
                  <strong>교환 및 반품이 불가능한 경우 </strong><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -상품 수령한지 7일이 경과 했을 경우 식품관련 당사 규정에 따라 교환 및 반품이 불가합니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -구매자의 과실로 인하여 상품이 훼손 또는 멸실되어 재판매가 불가능한 경우<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -상품이 훼손 및 파손되어 온 경우에는 유상처리 혹은 신청이 거부될 수 있습니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -제품의 가치가 감소한 경우에는 교환/환불이 불가합니다.(포장훼손, 상품부패 등)<br/>
                </p>
                <p align="left">
                  <strong>교환 및 반품시 유의사항 </strong><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -상품 교환 및 환불시에는 각 상품의 판매처의 규정을 우선으로 합니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -상품 환불시에는 박스 및 구성물이 정상인 상태에서만 가능합니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -개봉 후 사용한 상품은 하자가 없을시에도 교환이나 환불이 되지 않습니다.<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  -교환 및 환불은 CJ택배 또는 로젠택배로만 진행됩니다. 다른 운송방법 이용시에는 운송비를 부담하셔야 합니다.<br/>
                </p>
                <br/>
              </td>
            </tr>
            <tr height="30px"><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function stateToProps(state){
  return {
    user : state.setUser
  }
}
export default connect(stateToProps)(DetailPage1);
