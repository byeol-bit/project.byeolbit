const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./router/router.js');

require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({
  origin: true,     // 허락하고자 하는 요청 주소 true로 하면 프론트의 주소를 자동으로 넣어준다.
  credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  })
);

app.use('/api', route);

app.listen(port, ()=>{
  console.log('server running' + port);
});
