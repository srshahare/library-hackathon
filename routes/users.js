const express = require('express');
const router = require('express-promise-router')(); 
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/route-helpers');
const usersController = require('../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), usersController.singIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session: false}), usersController.secret);

    
router.route('/check')
    .get(usersController.check);

module.exports = router;
