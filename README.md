# Twitter API
- Express, MongoDB, socket
#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Setup .env in the root
2. Add MONGO_URI with the correct value

#### Models

1. User model: name, email, password
2. Twitter model: content, title, createdBy(ref: User)
3. Chat model: chatName, users(ref: User), latestMessage(ref: Message)
4. Message model: content, sender(ref: User), chat(ref: Chat)

#### Middleware
- authentication.js: for some controllers, need to add this to authenticate the user. this middleware will verify the token provide by user and add
  user id to request.
- error-handler.js: this project use express-async-errors. so all errors will be thrown and handled in here

#### APIs

- POST /auth/register: register a user. need to provide name, email, password in request body(all required). email need to be unique.
  server will send back stored user along with a jwt token if susccessfully created.
- POST /auth/login: log in a user. need to provide email, password(all required). if provided the correct combination will send back stored user along with a jwt token
- POST /tweets: create a tweet. need to provide content and title. user need to authenticate first. server sends back stored tweet(populate createdBy field)
- GET /tweets: get all tweets created by a user. user need to authenticate himself first.
- GET /tweets/:id : get a specific tweet created by a user.
- DELETE /tweets/:id : delete a tweet created by a user.
- PATCH /tweets/:id : update a tweet created by a user.
- POST /chats: create chat. must provide userId(the user the current user want to chat with). If they already have a chat return the chat stored otherwise create a new chat
- GET /chats: get all chats by this user 
- POST /messages: send a message. must provide message and chat id. create a message with those and update the latest message of the chat with chat id
- GET /messages/:chatID : get specific info about a chat

#### socket io
- use socket io so whenever a user send a message to another user, the other user can get the message immediately without refreshing.

#### Testing
- use jest for unit testing and integration testing.
- use an in-momory test database for test cases
- use POSTMAN to test all routes and socketio
  
