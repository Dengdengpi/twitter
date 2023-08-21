const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: [true, 'Please provide chat name'],
      maxlength: 500,
      minlength: 5,
      trim: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide users'],
    },],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message'
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chat', ChatSchema)