const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: 50,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide sender'],
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'please provide chat id']
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)