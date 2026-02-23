const express = require('express')
const transactionController = require('../controllers/transactionController')
const checkToken = require('../middlewares/checkToken')

const router = express.Router()

router.post('/add', checkToken, transactionController.createTransaction)

module.exports = router