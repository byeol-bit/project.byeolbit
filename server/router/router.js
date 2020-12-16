const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../database/dbconnection.js');

router.get('/', (req, res)=>res.json({username:'bryan'}));

router.get('/review/category', (req, res)=>{
  db.query('select * from review', (err, rows)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  });
});

router.get('/review_detail', (req, res)=>{
  console.log('review_detail 도착!');
  var category = req.query.category;
  var params = [category];
  var sql = "select * from review_detail where category=? order by user_update_date desc";
  db.query(sql, params, (err, rows)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  });
});

router.post('/review_detail/add', (req, res)=>{
  console.log('review_detail/add 도착!');
  var starRate = req.body.star;
  var comment = req.body.comment;
  var category = req.body.category;
  var currentTime = new Date();


  var sql = 'insert into review_detail (category, user_id, star_rate, user_comment, user_create_date, user_update_date) values(?, ?, ?, ?, ?, ?)';
  var params = [category, 'test', starRate, comment, currentTime, currentTime];
  db.query(sql, params, (err, result)=>{
    if(!err){
      res.send(result);
    }else{
      console.log(err);
    }
  });
});

module.exports = router;
