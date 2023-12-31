const User = require('../models/User')


const register = async (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all fields");
  }
  try{
    const user = await User.create({ ...req.body })
 
    const token = user.createJWT();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token
    })
  } catch {
    res.status(400);
    throw new Error("failed to create user");
  }


}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401);
    throw new Error('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
  // compare password
  const token = user.createJWT()
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token
  })
}

module.exports = {
  register,
  login,
}
