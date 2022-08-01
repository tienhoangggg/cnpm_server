const express = require("express");
const image = require("../controllers/image.controller");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.get("/like", jwt.verify, image.like);

module.exports = router;