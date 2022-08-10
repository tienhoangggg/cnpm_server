const express = require('express');
const jwt = require("../middleware/jwt");
const alternative = require("../controllers/alternative.controller")

const router = express.Router()


router.post('/add', jwt.verify, alternative.add)
router.post('/get', alternative.get)




module.exports = router;