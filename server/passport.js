const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
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


// LOCAL STRATEGY
passport.use( new LocalStrategy({
  usernameField: 'email'
}, async(email, password, done) => {
  // Find the user given the email
  const user = await User.findOne({ email })

   // If not, handle it
   if (!user) {
     return done(null, false)
   }

  // check if the password is correct
  

  //if not handle it

  // otherwise, return user

}))
