const Chat = require('../models/Chat')
const User = require('../models/User')

//find chat if already existed
const createChat = async (req, res) => {
  const {userId} = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("must provide the user id your trying to talk to")
  }
  let isChat = await Chat.find({
    users: { $all: [userId, req.user.userId] }
  }).populate("users", "-password").populate("latestMessage")
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email"
  });
  if(isChat.length > 0) {
    res.status(200).json(isChat[0])
  } else {
    let chatData = {
        chatName: "hello",
        users: [req.user.userId, userId]
    }
    try{
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
        res.status(201).send(fullChat);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
  }

}

const getAllChats = async (req, res) => {
    try {
        Chat.find({
            users: { $in: [req.user.userId] }
          }).populate("users", "-password")
          .populate("latestMessage")
          .sort({updatedAt: -1})
          .then(async(results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name email"
            });
            res.status(200).send(results)
          })

    } catch(err) {
        res.status(400);
        throw new Error(err.message);
    }
}

module.exports = {
    createChat,
    getAllChats,
  }
  