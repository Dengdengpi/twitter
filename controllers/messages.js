const Chat = require('../models/Chat')
const User = require('../models/User')
const Message = require('../models/Message')

const sendMessage = async(req, res) => {
    const {content, chatId} = req.body;
    if (!content || !chatId) {
        res.status(400);
        throw new Error("please provide content and chat id")
    }
    let newMessage = {
        sender: req.user.userId,
        content: content,
        chat: chatId
    };
    try{
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: "name email"
        });
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        });
        res.status(201).send(message);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}

const allMessages = async(req, res) => {
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "name email").populate("chat").sort({updatedAt: -1});
        res.send(messages);
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
}

module.exports = {
    sendMessage,
    allMessages,
  }
  