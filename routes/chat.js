const express = require('express')

const router = express.Router()
const {
createChat,
getAllChats,
} = require('../controllers/chats')

router.route('/').post(createChat).get(getAllChats)

module.exports = router
