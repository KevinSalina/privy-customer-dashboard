require('dotenv').config()
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
})

const s3 = new AWS.S3()

// Multer Only allowing csv files
const csvFilter = (req, file, cb) => {
  const mimetypes = ['csv', 'vnd.ms-excel']
  if ((mimetypes.some(mimetype => file.mimetype.includes(mimetype))) && path.extname(file.originalname).toLowerCase() === '.csv') {
    cb(null, true);
  } else {
    cb(`Please upload only CSV file. You're file type is ${file.mimetype}`, false)
  }
};

const upload = multer({
  fileFilter: csvFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: process.env.AWS_BUCKET,
    // metadata: function (req, file, cb) {
    //   cb(null, { fieldName: 'TESTING_METADATA' })
    // },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload