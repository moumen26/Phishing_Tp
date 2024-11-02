const express = require('express');
const router = express.Router();
const {
    FishingAttackSignin,
} = require('../controllers/AuthController.js');

//Sign in
router.post('/signin', FishingAttackSignin);


module.exports = router;