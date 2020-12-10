const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const route = require('./router/router.js');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, ()=>{
  console.log('server running' + port);
});
