const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users');
const passportSignin = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false});
const passportFacebook = passport.authenticate('facebookToken', { session: false})

router.post('/signup', validateBody(schemas.authSchema), UsersController.signUp);
router.post('/signin', validateBody(schemas.authSchema), passportSignin, UsersController.signIn);
router.post('/oauth/google', passportGoogle, UsersController.googleOauth);
router.post('/oauth/facebook', passportFacebook, UsersController.facebookOauth)
router.get('/secret', passportJwt, UsersController.secret);

module.exports = router;
