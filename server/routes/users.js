const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);
router.get('/secret', UsersController.secret);

module.exports = router;
