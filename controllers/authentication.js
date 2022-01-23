const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({
    sub: user.id,
    iat: timestamp,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPw,
    });
    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch(err) {
    return next(err);
  }
}