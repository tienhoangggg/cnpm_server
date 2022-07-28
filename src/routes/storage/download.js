const express = require("express");
const jwt = require("../../middleware/jwt");
const down = require("../../controllers/storage/download")
const router = express.Router();
router.post("/", jwt.verify, down.download);
module.exports = router;