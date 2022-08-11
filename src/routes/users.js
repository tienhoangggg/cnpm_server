const express = require('express');
const userController = require("../controllers/user.controller")
const jwt = require("../middleware/jwt");
const router = express.Router()


router.post('/login', userController.handleLogin)
router.post('/register', userController.handleRegister)
router.get('/verify/:token', userController.getVerifyEmail)
router.get('/get-all-users', userController.handleGetAllUsers)
router.get('/getprofile/:id', userController.handleGetProfile)
router.post('/updateprofile', jwt.verify, userController.changeName)



module.exports = router;