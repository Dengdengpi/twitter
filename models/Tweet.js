const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: 500,
      minlength: 5
    },
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 30,
      minlength: 3
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tweet', TweetSchema)
