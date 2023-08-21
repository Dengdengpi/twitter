const Tweet = require('../models/Tweet')

const getAllTweets = async (req, res) => {
  try{
  let tweets = await Tweet.find({ createdBy: req.user.userId }).sort('createdAt').populate("createdBy", "name");
  if (!tweets) {
    res.status(404);
    throw new Error("Tweets not found by this user");
  }
  res.status(200).json({ tweets, count: tweets.length })
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
}
const getTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req
  try{
  const tweet = await Tweet.findOne({
    _id: tweetId,
    createdBy: userId,
  }).populate("createdBy", "name");
  if (!tweet) {
    res.status(404);
    throw new Error(`No tweet with id ${tweetId}`)
  }
  res.status(200).json(tweet);
} catch (err) {
  res.status(400);
  throw new Error(err.message)
}
}

const createTweet = async (req, res) => {
  const {content, title} = req.body;
  if (!content || !title) {
    res.status(400);
    throw new Error("Provide required fields please")
  }
  let newTweet = {
    content,
    title,
    createdBy: req.user.userId
  }
  try{
    let tweet = await Tweet.create(newTweet);
    tweet = await tweet.populate("createdBy", "name");
    res.json(tweet)
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
}

const updateTweet = async (req, res) => {
  const {
    body: { title, content},
    user: { userId },
    params: { id: tweetId },
  } = req

  if (title === '' || content === '') {
    res.status(400);
    throw new Error('Content or title fields cannot be empty');
  }
  try{
  const tweet = await Tweet.findByIdAndUpdate(
    { _id: tweetId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  ).populate("createdBy", "name");
  if (!tweet) {
    throw new Error(`No tweet with id ${tweetId}`)
  }
  res.status(200).json(tweet);
} catch (err) {
  res.status(400);
  throw new Error(err.message);
}
}

const deleteTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId},
  } = req
 try{
  const tweet = await Tweet.findByIdAndRemove({
    _id: tweetId,
    createdBy: userId,
  })
  if (!tweet) {
    throw new Error(`No tweet with id ${tweetId}`)
  }
  res.status(StatusCodes.OK).send()
} catch (err) {
  res.status(400);
  throw new Error(err.message);
}
}

module.exports = {
  createTweet,
  deleteTweet,
  getAllTweets,
  updateTweet,
  getTweet,
}
