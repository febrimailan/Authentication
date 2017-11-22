const JWT = require('jsonwebtoken')
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration')

signToken = user => {
  // res.json({ user: 'created'})
  return JWT.sign({
    iss:'febrimailan',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1 ) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check same email
    const foundUser = await User.findOne({ "local.email":email })
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already use' })
    }

    // crete user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password
      }
    })
    await newUser.save();

    // Generate the token
    const token = signToken(newUser)

    // Respon with token
    res.status(200).json({ token })
  },

  signIn: async (req, res, next) => {
    // Generate token
    // console.log('req.user ', req.user);
    const token = signToken(req.user);
    res.status(200).json({ token })
    console.log('Success for login!');
  },

  googleOauth: async (req, res, next) => {
    // Generate token
    console.log('req.user: ', req.user);

    const token = signToken(req.user);
    res.status(200).json({ token })
  },

  facebookOauth: async (req, res, next) => {
    // Generate token
    console.log('got here');
    console.log('req.user: ', req.user);
    //
    const token = signToken(req.user);
    res.status(200).json({ token })
  },

  secret: async (req, res, next) => {
    //
    console.log('I managed to get here!');
    res.json({secret : "resource"});
  }
};
