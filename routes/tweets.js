const express = require('express')

const router = express.Router()
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  updateTweet,
  getTweet,
} = require('../controllers/tweets')

router.route('/').post(createTweet).get(getAllTweets)

router.route('/:id').get(getTweet).delete(deleteTweet).patch(updateTweet)

module.exports = router
