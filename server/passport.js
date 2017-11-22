const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
// const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');
require('dotenv').config()

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async(payload, done)=>{
  try {
    // find user specified in token
    const user = await User.findById(payload.sub)

    // if user doesn't exist, handle it
    if (!user) {
      return done(null, false)
    }
    // Otherwise, return the user
    done(null, user)
  } catch(error) {
    done(error, false);
  }
}))

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.GG_CLIENT_ID,
  clientSecret: process.env.GG_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);

    // Check whether user current user exist in DB
    const existingUser = await User.findOne({ "google.id": profile.id});
    if (existingUser) {
      console.log('User already exist on DB');
      return done(null, existingUser)
    }

    console.log(`user doesn't exist, you're creating new user`);
    // if new account
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser)
  } catch (error) {
    done(error, false, error.message)
  }

}));

// FACEBOOK STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile: ', profile);
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);

    const existingUser = await User.findOne({"facebook.id": profile.id});
    if(existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    })

  } catch (error) {
    done(error, false, error.message)
  }
}))

// LOCAL STRATEGY
passport.use( new LocalStrategy({
  usernameField: 'email'
}, async(email, password, done) => {
  try {
    console.log('email: ', email);
    // Find the user given the email
    const user = await User.findOne({ "local.email": email })

     // If not, handle it
     if (!user) {
       return done(null, false)
     }

    // check if the password is correct
    const isMatch = await user.isValidPassword(password)
    console.log('isMatch: ', isMatch);

    //if not handle it
    if (!isMatch) {
      return done(null, false)
    }
    // otherwise, return user
    done(null, user)
  } catch (error) {
    done(error, false)
  }

}));
