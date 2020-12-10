const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'byeol-bit-db.ci8ju2bnrarr.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'tkd!tjs23',
    database: 'byeolbitdb'
  }
);

module.exports = connection;
