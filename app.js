require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const tweetRouter = require('./routes/tweets');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

app.use(express.json());
// extra packages

// routes
app.use('/auth', authRouter);
app.use('/tweets',authenticateUser, tweetRouter);
app.use('/chats', authenticateUser, chatRouter);
app.use('/messages', messageRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(PORT, () =>
      console.log(`Server is listening on port 3000...`)
    );
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000"
      }
    })
    io.on("connection", (socket) => {
      console.log("connected")
      socket.on("conn", (mess) => {
        socket.send(mess);
        console.log(mess);
      })
      socket.on("setup", (user) => {
        socket.join(user._id);
        socket.send("connected with this user")
        console.log("user connected")
      });

      socket.on('new message', (newMessage) => {
        let chat = newMessage.chat;
        chat.users.forEach(user => {
          if (user._id == newMessage.sender._id) return;
          socket.in(user._id).emit("message received", newMessage);
        })
      })
    })
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = app;
