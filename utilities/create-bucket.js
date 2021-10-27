require('dotenv').config()
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
})

const params = {
  Bucket: process.env.AWS_BUCKET,
}

s3.createBucket(params, (err, data) => {
  if (err) return console.log(err, err.stack)

  return console.log('Bucket Created Successfully', data.Location)
})
