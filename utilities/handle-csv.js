const csvtojsonV2 = require("csvtojson");

const handleCSVTest = async (stream) => {

  errors = {}

  const jsonArr = await csvtojsonV2({
    noheader: false,
    headers: ['email', 'firstName', 'lastName', 'phone', 'city', 'state', 'lastOrderPrice', 'lastOrderDate']
  })
    .fromStream(stream)
    .on('error', (err) => errors.parsingErr = err.message)


  if (jsonArr.length === 0) errors.error = 'Please upload valid CSV file.'
  else if (!Object.keys(jsonArr[0]).length === 8) errors.error = 'Please upload valid CSV file.'

  return {
    errors,
    success: !Object.keys(errors).length > 0,
    customerArr: !Object.keys(errors).length > 0 ? jsonArr : null
  }
}

module.exports = handleCSVTest
