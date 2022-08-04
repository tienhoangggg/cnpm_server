const express = require("express");
const view = require("../controllers/getview");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.post("/", view.getview);

module.exports = router;