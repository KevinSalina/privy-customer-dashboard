const express = require('express')
const router = express.Router()
const { getCustomers } = require('../controllers/customers/customer-controller')

router.get('/', getCustomers);

module.exports = router;