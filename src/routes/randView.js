const express = require("express");
const randview = require("../controllers/getRandView");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.post("/", randview.getview);

module.exports = router;