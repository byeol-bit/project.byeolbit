import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// router setting
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

function getTimeStamp(userDate){
  var d = new Date(userDate);
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

    return s;
}
function leadingZeros(n, digits){
  var zero = '';
  n = n.toString();

  if(n.length < digits){
    for(let i = 0; i < digits - n.length; i++)
      zero += '0';
  }

  return zero + n;
}

const user = {
  isLogin:false,
  id:null,
  name:null,
  profile:null,
  phone:null,
  sex:null,
  email:null
};

function setUser(state = user, action){

  if(action.type === 'initializeUser'){
    console.log('initializeUser 작동');
    let tempUser = {
      isLogin:action.payload.isLogin,
      id:action.payload.id,
      name:action.payload.name,
      profile:action.payload.profile,
      phone:action.payload.phone,
      sex:action.payload.sex,
      email:action.payload.email
    };
    return tempUser;
  }else{
      return state;
  }
}

function setTime(state = new Date(), action){
  if(action.type ==='changeType'){
    console.log('aasdf',action.payload);
    let temp = new Date(action.payload);
    return getTimeStamp(temp);
  }

  return getTimeStamp(state);
}

const orderList = [
  {
    procNo: 0,
    procCount: 0
  }
];

function setOrderList(state = orderList, action){
  if(action.type === 'setList'){
    let temp = action.payload;
    return temp;
  }
  return state;
}

let store = createStore(combineReducers({setUser, setTime, setOrderList}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
