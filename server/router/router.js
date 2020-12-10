const express = require('express');
const router = express.Router();
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

module.exports = router;
