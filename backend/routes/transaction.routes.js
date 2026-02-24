const express = require('express')
const transactionController = require('../controllers/transactionController')
const checkToken = require('../middlewares/checkToken')

const router = express.Router()

router.post('/add', checkToken, transactionController.createTransaction)
router.get('/list', checkToken, transactionController.getTransaction)
router.delete('/delete/:id', checkToken, transactionController.deleteTransaction)

module.exports = router