import { useState } from 'react';
import '../css/CartPage.scss';
import cart from '../assets/images/icon_cart(big).png';

function CartPage() {
  return (
    <div className="cart_wrap">
      <h1>장바구니</h1>
      <div className="cart_tab">
        <div id="cart_left_title">장바구니</div>
        <div id="cart_right_title"><span>01장바구니</span> &gt; 02주문결제 &gt; 03주문완료</div>
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

      <div>
        <table className="cart_table_middle">
          <tbody>
            <tr>
              <td>
                <img id="icon_cart" src={cart}/>
                <span>장바구니에 담긴 상품이 없습니다.</span>
              </td>
            </tr>
          </tbody>
        </table>
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
      <div className="cart_bottom_button">
        <div className="cart_left">
          <button className="btn_cart_left">선택상품 삭제</button>
          <button className="btn_cart_left">쇼핑 계속하기</button>
        </div>
        <div className="cart_right">
          <button className="btn_cart_right">선택상품 주문하기</button>
          <button className="btn_cart_right red">전체상품 주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage;
