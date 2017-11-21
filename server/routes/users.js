const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users');

router.post('/signup', validateBody(schemas.authSchema), UsersController.signUp);
router.post('/signin', UsersController.signIn);
router.get('/secret', passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;
