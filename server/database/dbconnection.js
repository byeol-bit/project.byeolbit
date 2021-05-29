const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: '/home/ubuntu/server/project.byeolbit/.env' });


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE ,
    connectionLimit: 4
  }
);

module.exports = connection;
