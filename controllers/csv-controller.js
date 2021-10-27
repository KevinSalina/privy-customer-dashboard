require('dotenv').config();
const handleCSV = require('../utilities/handle-csv')
const models = require('../models')
const AWS = require('aws-sdk');

const uploadCSV = async (filename) => {

  const S3 = new AWS.S3()

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename
  }

  try {
    const stream = S3.getObject(params).createReadStream()
    const parseResult = await handleCSV(stream)

    if (!parseResult.success) return { errors: parseResult.errors }

    await models.Customer.bulkCreate(parseResult.customerArr, { validate: true })

    return {
      message: 'File uploaded succesfully!',
      status: 200
    }

  } catch (err) {
    return {
      message: 'Server Error. Cannot upload file.',
      status: 500,
      error: err.message
    }
  }
}

module.exports = { uploadCSV }