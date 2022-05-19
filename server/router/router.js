const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const upload = require('../AWS/uploadImg.js');
const multer = require('multer');
const db = require('../database/dbconnection.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET='byeolbit';


router.post('/user/logout', (req, res)=>{
    console.log('/user/logout 도착');

    res.clearCookie('token');
    res.json({success:true});
});

router.post('/user/auth', (req,res)=>{
    console.log('/user/auth 도착');

    var token = req.body.token;
    var data = jwt.verify(token, JWT_SECRET);

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
                            JWT_SECRET,
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
              JWT_SECRET,
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
  console.log('/products 도착!');
  db.query('select * from product', (err, rows)=>{
    if(!err){
      res.json({success:true, list:rows});
    }else{
      console.log(err);
    }
  });
});

router.get('/product', (req, res)=>{
  console.log('/product 도착!');
  var product_no = Number(req.query.procno);
  var params = [product_no];

  db.query('select * from product where product_no=?', params, (err, rows)=>{
    if(!err){
      res.json({success:true, product:rows});
    }else{
      console.log(err);
    }
  });
});

router.get('/review/category', (req, res)=>{
  console.log('/review/category 도착!');
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

router.get('/cart_detail', (req, res)=>{
  console.log('cart_detail 도착!');
  var cartid = Number(req.query.cartid);
  var params = [cartid];
  var sql = "select * from cart_detail where cart_no=? order by cart_create_date desc";
  db.query(sql, params, (err, rows)=>{
    if(!err){
      res.json({success:true, list:rows});
    }else{
      console.log(err);
    }
  });
});

router.post('/cart/add', (req, res)=>{
  console.log('cart/add 도착!');
  var userid = req.body.userid;
  var currentTime = new Date();


  var sql = 'insert into cart (user_id, cart_create_date) values(?, ?)';
  var params = [userid, currentTime];
  db.query(sql, params, (err, result)=>{
    if(!err){
      res.send({success:true, cartid:result.insertId});
    }else{
      console.log(err);
    }
  });
});

router.post('/cart_detail/add', (req, res)=>{
  console.log('cart_detail/add 도착!');
  var cartId = Number(req.body.cartId);
  var procNo = Number(req.body.procNo);
  var procName = req.body.procName;
  var procPrice = req.body.procPrice;
  var procCount = req.body.procCount;
  var currentTime = new Date();

  db.beginTransaction((error)=>{

    var sql = 'select * from cart_detail where cart_no = ? and product_no = ?';
    var params = [cartId, procNo];

    db.query(sql, params, (err, rows)=>{
        if(!err){
          if(rows.length > 0){
            console.log(rows[0].product_count);
            sql = 'update cart_detail set product_count = ? where cart_no = ? and product_no = ?';
            params = [procCount + rows[0].product_count, cartId, procNo];
            db.query(sql, params, (e, result)=>{
              if(result.changedRows > 0){
                res.send({success:true});
              }else {
                res.send({success:false});
              }

            });
          }else {
            sql = 'insert into cart_detail (cart_no, product_no, product_name, product_price, product_count, cart_create_date) values(?, ?, ?, ?, ?, ?)';
            params = [cartId, procNo, procName, procPrice, procCount, currentTime];
            db.query(sql, params, (err, result)=>{
              if(!err){
                res.send({success:true});
              }else{
                console.log(err);
              }
            });
          }
        }
    });
  });

});

router.post('/cart_detail/delete', (req, res)=> {
  console.log('cart_detail/delete 도착!');
  var cartId = req.body.cartId;
  var list = req.body.list;
  var success = false;

    db.beginTransaction((err)=>{
      var sql = 'delete from cart_detail where cart_no = ? and product_no = ?';
      var params = [];

      for(let i = 0; i < list.length; i++){
        params = [cartId, list[i]];
        db.query(sql, params, (e, result)=>{
          if(e) db.rollback();
        });
      }

      db.commit();
      success = true;
      res.send({success:success});
    });
});

module.exports = router;
