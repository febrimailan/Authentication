const User = require('../models/user')

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check same email
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already use' })
    }

    // crete user
    const newUser = new User({
      email: email,
      password: password
    })
    await newUser.save();

    // respon with token
    res.json({ user: 'created'})
  },
  signIn: async (req, res, next) => {
    // Generate token
    console.log('UsersController.signIn() called!');
  },
  secret: async (req, res, next) => {
    //
    console.log('UsersController.secret() called!');
  }
};
