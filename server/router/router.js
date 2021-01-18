const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const upload = require('../AWS/uploadImg.js');
const multer = require('multer');
const db = require('../database/dbconnection.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

router.post('/user/logout', (req, res)=>{
    console.log('/user/logout 도착');

    res.clearCookie('token');
    res.json({success:true});
});

router.post('/user/auth', (req,res)=>{
    console.log('/user/auth 도착');

    var token = req.body.token;
    var data = jwt.verify(token, process.env.JWT_SECRET);

    var id = data.id;
    var sql = "select * from user where user_id=?";
    var params = [id];
    db.query(sql, params, (err,rows)=>{
      if(!err){
        if(rows.length > 0){
          res.json({auth: true, user:data});
        }
        else{
          res.json({auth: false});
        }
      }
    });
});

router.post('/user/modify', (req,res)=>{
  console.log('/user/modify 도착');
  var id = req.body.id;
  var pw = req.body.pw;
  var newPw = req.body.newPw;
  var sex = req.body.sex;
  var phone = req.body.phone;
  var email = req.body.email;
  // 회원정보를 수정해되 되는지 여부 flag
  console.log(`${id}, ${pw}, ${newPw}, ${sex}, ${phone}, ${email}`);
  var isError = true;
  var dbpw = '';

  var sql = "select * from user where user_id=?";
  var params = [id];
  db.query(sql, params, (err, rows)=>{
    if(!err){
      if(rows.length > 0)
      {
        dbpw = rows[0].user_pw;
        bcrypt.compare(pw, dbpw).then((isMatch)=>{
          if(isMatch){
            sql = "update user set user_pw=?, user_phone=?, user_email=?, user_sex=? where user_id =?";
            if(newPw !== null){
              pw = newPw;
            }

            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(pw, salt, function(err, hash) {

                params = [hash, phone, email, sex, id];
                db.query(sql, params, (err, rows)=>{
                  if(!err){
                    if(rows.changedRows === 1){
                      sql = "select * from user where user_id=?";
                      params = [id];
                      db.query(sql, params, (err,rows)=>{
                        if(rows.length > 0){
                          const payload = {
                            id: rows[0].user_id,
                            profile: rows[0].user_profile,
                            phone: rows[0].user_phone,
                            name: rows[0].user_name,
                            sex: rows[0].user_sex,
                            email:rows[0].user_email
                          };

                          res.clearCookie('token');
                          // jwt를 이용한 token 생성
                          jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {
                              // token 지속시간
                              expiresIn: '1h',
                            },
                            (err, token) =>{
                              // res.cookie('키', '값')은 cookie에 키 값을 넣는 방식입니다.
                              res.cookie('token', token);
                              // res.json으로 값을 확인 해보겠습니다.
                              res.json({success: true, user:payload});
                            },
                          );
                        }
                      });
                    }
                  }
                });
              });
            });
          }
        })
      }else{
        res.json({message: 'password is not correct.'});
      }
    }else{
      console.log(err);
    }
  });
});

router.post('/user/login', (req,res)=>{
  console.log('user/login 도착!');
  var id = req.body.id;
  var pw = req.body.pw;
  var dbpw = '';

  var sql = "select * from user where user_id=?";
  var params = [id];
  db.query(sql, params, (err, rows)=>{
    if(!err){
      if(rows.length > 0)
      {
        dbpw = rows[0].user_pw;
        bcrypt.compare(pw, dbpw).then((isMatch)=>{
          if(isMatch){

            const payload = {
              id: rows[0].user_id,
              profile: rows[0].user_profile,
              phone: rows[0].user_phone,
              name: rows[0].user_name,
              sex: rows[0].user_sex,
              email:rows[0].user_email
            };

            // jwt를 이용한 token 생성
            console.log('작동');
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                // token 지속시간
                expiresIn: '1h',
              },
              (err, token) =>{
                // res.cookie('키', '값')은 cookie에 키 값을 넣는 방식입니다.
                console.log(token);
                res.cookie('token', token);
                // res.json으로 값을 확인 해보겠습니다.
                res.json({success: true, user:payload});
              },
            );
            console.log('작동');
          }
        })
      }else{
        res.json({success: false});
      }
    }else{
      console.log(err);
    }
  });

});

router.get('/user', (req,res)=>{
  console.log('user 도착!');
  var id = req.query.id;
  var params = [id];

  var sql = "select * from user where user_id=?";
  db.query(sql, params, (err, rows)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  });
});

router.post('/signup', (req,res)=>{
  console.log('signup 도착!');

  var currentTime = new Date();
  var user_id = req.body.id;
  var user_name = req.body.name;
  var user_phone = req.body.phone;
  var user_email = req.body.email;
  var user_sex = req.body.sex;
  var user_profile = '';
  if(user_sex === 'male'){
    user_profile = 'https://byeolbit-bucket.s3.ap-northeast-2.amazonaws.com/byeol-bit/user_male.png';
  }else{
    user_profile = 'https://byeolbit-bucket.s3.ap-northeast-2.amazonaws.com/byeol-bit/user_female.png';
  }
  var user_pw = req.body.pw;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user_pw, salt, function(err, hash) {

      var sql = "insert into user values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var params = [user_id, user_profile, user_email, user_phone, hash, user_name, user_sex, currentTime, currentTime];
      console.log(params);

      db.query(sql, params, (err, rows)=>{
        if(!err){
          res.json(rows);
        }else{
          console.log(err);
        }
      });
    });
  });
});

router.post('/inquiry/add', (req,res)=>{
  console.log('inquiry add 도착');
  var id = req.body.id;
  var category = req.body.category;
  var message = req.body.message;
  var currentTime = new Date();

  var sql = "insert into inquiry (user_id, category, inquiry_msg, inquiry_create_date) values (?,?,?,?)";
  var params = [id, category, message, currentTime];
  db.query(sql, params, (err,rows)=>{
    if(!err){
      res.json({success:true});
    }else{
      console.log(err);
    }
  });
});

router.post('/inquiry/delete', (req,res)=>{
  console.log('inquiry delete 도착');
  var list = req.body.list;
  console.log(list);
  var success = true;

  var sql = "delete from inquiry where inquiry_no=?";
  var params = [];
  for(let i = 0; i < list.length; i++){
    params = [list[i]];
    db.query(sql, params, (err,rows)=>{
      if(err) success = false;
      else console.log(rows);
    });
  }

  if(success){
    res.json({success:true});
  }else{
    res.json({success:false});
  }
});

router.get('/inquiry', (req, res)=>{
  console.log('inquiry 도착!');
  var id = req.query.id;
  var params = [id];
  var sql = "select * from inquiry where user_id=? order by inquiry_create_date";
  db.query(sql, params, (err, rows)=>{
    if(!err){
      res.json({success:true, list:rows});
    }else{
      console.log(err);
    }
  });
});

router.get('/best-products', (req, res)=>{
  console.log('/best-products 도착!');
  var params = ['best'];
  db.query('select * from product where product_status=?', params, (err, rows)=>{
    if(!err){
      res.json({success:true, list:rows});
    }else{
      console.log(err);
    }
  });
});

router.get('/products', (req, res)=>{

  db.query('select * from product', (err, rows)=>{
    if(!err){
      res.json({success:true, list:rows});
    }else{
      console.log(err);
    }
  });
});

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

router.post('/review_detail/uploadImgtoS3', (req, res, next)=>{
  // FormData의 경우 req로 부터 데이터를 얻을수 없다.
  // upload 핸들러(multer)를 통해서 데이터를 읽을 수 있다
  console.log('review_detail/uploadImgtoS3 도착!');

  upload(req, res, function(err) {
    if(err instanceof multer.MulterError){
      return next(err);
    }else if(err){
      return next(err);
    }

    console.log('원본파일명 : ' + req.file.originalname)
    console.log('크기 : ' + req.file.size)
    console.log('경로 : ' + req.file.location) // s3 업로드시 업로드 url을 가져옴
    return res.send({name: req.file.originalname, desc: req.file.location, size: req.file.size});
  });
});

router.post('/review_detail/add', (req, res)=>{
  console.log('review_detail/add 도착!');
  var starRate = req.body.star;
  var comment = req.body.comment;
  var category = req.body.category;
  var photoes = req.body.photo;
  var currentTime = new Date();


  var sql = 'insert into review_detail (category, user_id, star_rate, user_photo, user_comment, user_create_date, user_update_date) values(?, ?, ?, ?, ?, ?, ?)';
  var params = [category, 'test', starRate, photoes, comment, currentTime, currentTime];
  db.query(sql, params, (err, result)=>{
    if(!err){
      res.send(result);
    }else{
      console.log(err);
    }
  });
});

module.exports = router;
