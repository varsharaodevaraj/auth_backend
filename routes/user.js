const express = require('express');
const router = express.Router();
const {
    handleUserLogInGet,
    handleUserLogInPost,
    handleUserSignUpGet,
    handleUserSignUpPost,
    handleUserLogOut
} = require('../controller/user');

router.route('/signup')
.post(handleUserSignUpPost)
.get(handleUserSignUpGet)

router.route('/login')
.post(handleUserLogInPost)
.get(handleUserLogInGet)

router.get('/logout',handleUserLogOut);

module.exports = router;