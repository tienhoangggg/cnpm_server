const express = require('express');
const jwt = require("../middleware/jwt");
const feedbackController = require("../controllers/feedback.controller")

const router = express.Router()


router.post('/create', jwt.verify, feedbackController.handleCreate)
router.post('/delete', feedbackController.handleDelete)



module.exports = router;