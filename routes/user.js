const express = require('express');
const router = express.Router();
const {
    handleUserLogInGet,
    handleUserLogInPost,
    handleUserSignUpGet,
    handleUserSignUpPost
} = require('../controller/user');

router.route('/signup')
.post(handleUserSignUpPost)
.get(handleUserSignUpGet)

router.route('/login')
.post(handleUserLogInPost)
.get(handleUserLogInGet)

module.exports = router;