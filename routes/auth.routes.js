const express = require('express');
const {signin,signup} = require('../controllers/auth.controller');
const {checkDuplicateUsernameorEmail,checkRolesExisted} = require('../middlewares/verifySignup');
const { Router } = require('express');
const router = express.Router();


router.post('/signup',checkDuplicateUsernameorEmail,checkRolesExisted,signup);
router.post('/signin',signin);

module.exports.authRoutes = router;
