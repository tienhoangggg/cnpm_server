const express = require("express");
const search = require("../controllers/search.controller");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.get("/:key", search.get);

module.exports = router;