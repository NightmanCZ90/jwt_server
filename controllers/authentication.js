const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    const user = new User({
      email,
      password,
    });
    await user.save();

    res.json({ success: true });
  } catch(err) {
    return next(err);
  }
}