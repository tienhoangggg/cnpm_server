const express = require('express');
const userController = require("../controllers/user.controller")

const router = express.Router()


router.post('/login', userController.handleLogin)
router.post('/register', userController.handleRegister)
router.get('/verify/:token', userController.getVerifyEmail)
router.get('/get-all-users', userController.handleGetAllUsers)
router.get('/getProfile', userController.handleGetProfile)




module.exports = router;