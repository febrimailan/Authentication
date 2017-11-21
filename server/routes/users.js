const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users');
const passwordSignin = passport.authenticate('local', { session: false });
const passwordJwt = passport.authenticate('jwt', { session: false });

router.post('/signup', validateBody(schemas.authSchema), UsersController.signUp);
router.post('/signin', validateBody(schemas.authSchema), passwordSignin, UsersController.signIn);
router.get('/secret', passwordJwt, UsersController.secret);

module.exports = router;
