const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment');

require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_accessKEY,
  secretAccessKey: process.env.AWS_secretAccessKey,
  region: process.env.region,
  s3BucketEndpoint: false,
  endpoint: 'https://s3.amazonaws.com'

})

const storage = multerS3({
  s3: s3,
  bucket: 'byeolbit-bucket',
  acl: 'public-read',
  metadata: function (req, file, cb){
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb){
    cb(null, moment().format('YYYYMMDDHHmmss') + "-" + file.originalname)
  }

})

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).single('file');

module.exports = upload;
