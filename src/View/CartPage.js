import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import '../css/CartPage.scss';
import cart from '../assets/images/icon_cart(big).png';
import {setComma} from '../Model/CommonFnc';

function CartPage(props) {

  const history = useHistory();

  const [cartList, setCartList] = useState([]);
  const [listPrice, setListPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(true);

  const cartid = localStorage.getItem('cartid');

  useEffect(async ()=>{
    if(deleteBtnClicked){

      let res = await axios.get('http://3.34.57.203:3000/api/cart_detail', {params:{cartid:cartid}});
      console.log('res', res);

      setCartList(res.data.list);
      let sumListPrice = 0;
      if(res.data.list.length > 1) sumListPrice = res.data.list.reduce((acc, cur)=>{return acc.product_price*acc.product_count + cur.product_price*cur.product_count});
      else sumListPrice = res.data.list[0].product_price*res.data.list[0].product_count;

      setListPrice(sumListPrice);
      setTotalPrice(sumListPrice);

      let temparr = res.data.list.map((item)=>{return item.product_no});
      setSelectList(temparr);

      setDeleteBtnClicked(false);
    }

  }, [deleteBtnClicked]);

  function selectItemAll(e) {

    let item = null;
    // 해당 checkbox checked 변경
    for(let i = 0; i < cartList.length; i++){
      item = document.getElementById(`cbx_item_${i}`);
      item.checked = e.target.checked;
    }

    // 전체 선택일때
    if(e.target.checked){
      let temparr = cartList.map((item)=>{return item.product_no});
      setSelectList(temparr);

      let sumListPrice = 0;
      let cList = [...cartList];

      let index = 0;
      for(let i = 0; i < cList.length; i++){
        for(let j = 0; j < temparr.length; j++){
          if(cList[i].product_no === temparr[j])
            sumListPrice += cList[i].product_price * cList[i].product_count;
        }
      }

      setListPrice(sumListPrice);
      setTotalPrice(sumListPrice);
    }else{  // 전체 해제일때
      setSelectList([]);
      setListPrice(0);
      setTotalPrice(0);
    }
  }
  function deleteSelectedItem() {
    axios.post('http://3.34.57.203:3000/api/cart_detail/delete', {cartId:cartid, list:selectList})
    .then((res)=>{
      console.log(res.data);
      if(res.data.success){
        setDeleteBtnClicked(true);
      }
    })
    .catch()
  }
  function btnOrderSelected() {
    props.dispatch({type:'setList' ,payload:selectList});
    history.push('/order');
  }
  function btnOrderAll() {
    let temp = cartList.map((item)=> {return item.product_no});
    props.dispatch({type:'setList' ,payload:temp});
    history.push('/order');
  }


  return (
    <div className="cart_wrap">
      <h1>장바구니</h1>
      <div className="cart_tab">
        <div id="cart_left_title">장바구니</div>
        <div id="cart_right_title"><span>01장바구니</span> &gt; 02주문/결제 &gt; 03주문완료</div>
      </div>

      <div style={{fontSize:"11px", color:"#4f4f4f", padding:"10px 2px", textAlign:"left"}}>* 제품의 품절로 상품발송이 부득이하게 이루어지지 못하는 경우가 있으므로 이점 미리 양해해주시기 바랍니다. 빠른 배송을 위해 최선을 다하겠습니다.</div>
      <div>
        <table className="cart_table_top" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td width="53px"><input id="cbx_item_all" type="checkbox" onChange={selectItemAll} defaultChecked/></td>
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
      {
        cartList
        ?cartList.map((item, i)=>{
          return <CartList item={item} selectList={selectList} setSelectList={setSelectList} cartList={cartList} setCartList={setCartList} setListPrice={setListPrice} setTotalPrice={setTotalPrice} index={i} key={i}></CartList>
        })
        :<NonCartList></NonCartList>
      }


      <table className="cart_table_bottom">
        <tbody>
          <tr height="68px">
            <td width="267px">상품금액</td>
            <td width="267px">추가금액(배송비)</td>
            <td width="267px">총 할인금액</td>
            <td>총 결제금액</td>
          </tr>
          <tr style={{fontSize:"20px", fontFamily:"nt-M", fontWeight:"500"}}>
          <td><span id="cart_item_price">{setComma(listPrice)}</span>원</td>
          <td><div style={{fontSize:"14px", color:"#afafaf"}}>주문결제페이지에서<br/>확인가능합니다.</div></td>
          <td><span>0</span>원</td>
          <td style={{fontWeight:"700"}}><span id="cart_final_price">{setComma(totalPrice)}</span>원</td>
          </tr>
        </tbody>
      </table>
      <div className="cart_bottom_button">
        <div className="cart_left">
          <button className="btn_cart_left" onClick={deleteSelectedItem}>선택상품 삭제</button>
          <button className="btn_cart_left" onClick={()=> history.push('/store')}>쇼핑 계속하기</button>
        </div>
        <div className="cart_right">
          <button className="btn_cart_right" onClick={btnOrderSelected}>선택상품 주문하기</button>
          <button className="btn_cart_right red" onClick={btnOrderAll}>전체상품 주문하기</button>
        </div>
      </div>
    </div>
  )
}

function CartList(props) {
  var [procCount, setProcCount] = useState(props.item.product_count);
  var [procPrice, setProcPrice] = useState(props.item.product_price);

  useEffect(()=>{
    setProcCount(props.item.product_count);
    setProcPrice(props.item.product_price);
  }, []);

  function changeCount(e){
    if(e.target.value < 1 || e.target.value > 99) return;
    let count = e.target.value;
    setProcCount(count);

    let sumListPrice = 0;
    let sList = [...props.selectList];
    let cList = [...props.cartList];
    cList[props.index].product_count = count;

    console.log('sList', sList);
    console.log('cList', cList);
    let index = 0;
    for(let i = 0; i < cList.length; i++){
      for(let j = 0; j < sList.length; j++){
        if(cList[i].product_no === sList[j])
          sumListPrice += cList[i].product_price * cList[i].product_count;
      }
    }
    props.setCartList(cList);
    props.setListPrice(sumListPrice);
    props.setTotalPrice(sumListPrice);
  }

  function changeChecked(e){

    let temparr = [];
    if(e.target.checked){
      // 처음 값이 없을때
      if(props.selectList.length === 0) {
        temparr = [props.cartList[props.index].product_no];
        props.setSelectList(temparr);
      }else{
        let isSelected = props.selectList.find(value => value === props.cartList[props.index].product_no);
        if(isSelected === undefined){
          temparr = [...props.selectList, props.cartList[props.index].product_no];
          props.setSelectList(temparr);
        }
      }
    }else{
        temparr = [...props.selectList];
        let selectedNum = temparr.indexOf(props.cartList[props.index].product_no);
        temparr.splice(selectedNum, 1);
        props.setSelectList(temparr);
    }

    let sumListPrice = 0;
    let cList = [...props.cartList];

    let index = 0;
    for(let i = 0; i < cList.length; i++){
      for(let j = 0; j < temparr.length; j++){
        if(cList[i].product_no === temparr[j])
          sumListPrice += cList[i].product_price * cList[i].product_count;
      }
    }

    props.setListPrice(sumListPrice);
    props.setTotalPrice(sumListPrice);
  }

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
            <td width="53px"><input id={`cbx_item_${props.index}`} type="checkbox" onChange={changeChecked} defaultChecked/></td>
            <td width="640px">
              <div style={{textAlign:"left", marginLeft:"60px"}}>
                <img src={props.item.product_sumnail} style={{width:"50px", height:"50px", backgroundSize:"contain", verticalAlign:"middle", marginRight:"30px"}}/>
                {props.item.product_name}
              </div>

            </td>
            <td width="120px"><div style={{textAlign:"right", marginRight:"15px"}}>{setComma(procPrice)}원</div></td>
            <td width="60px"><input style={inputCountStyle} type="number" value={procCount} onChange={changeCount}/></td>
            <td width="120px"><div style={{textAlign:"right", marginRight:"15px"}}>{setComma(procPrice*procCount)}원</div></td>
            <td width="103px">쿠폰</td>
            <td width="60px">삭제</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function NonCartList() {
  return(
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
  )
}

function stateToProps(state){
  return {
    orderList : state.setOrderList
  }
}
export default connect(stateToProps)(CartPage);
