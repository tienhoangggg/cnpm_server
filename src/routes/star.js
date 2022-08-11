const express = require("express");
const star = require("../controllers/star.controller");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.post("/", jwt.verify, star.get);

module.exports = router;