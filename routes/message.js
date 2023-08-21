const express = require('express')
const authenticateUser = require('../middleware/authentication');

const router = express.Router()
const {
    sendMessage,
    allMessages,
} = require('../controllers/messages')

router.route('/').post(authenticateUser, sendMessage)
router.route('/:chatId').get(allMessages)

module.exports = router