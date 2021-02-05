import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Items.scss';

function Items(props) {

    let itemlist = props.list;
    let title = props.title;

    return (
      <div className="items">

        <ul className="item_list_wrap">
          {console.log('title : ', title)}
          {

            itemlist.map((item, i)=>{
              if(title === "전체보기")
                return <Item item={item} key={i}/>

              if(title !== undefined){
                if(item.product_name === title)
                  return <Item item={item} key={i}/>
              }
              else{
                return <Item item={item} key={i}/>
              }
            })
          }
        </ul>
      </div>
    )
}

function Item(props){

  return (
    <li className="item_list">
      <div className="item">
        <Link to={`/detail/${props.item.product_no}`}><img src={props.item.product_sumnail}/></Link>
      </div>
      <div className="description">
        <h6>{ props.item.product_subname }</h6>
        <p>{ props.item.product_price }<br/>
          (100g당 1,250원)
        </p>
      </div>
    </li>
  )
}

export default Items;
