const express = require("express");
const jwt = require("../../middleware/jwt");
const del = require("../../controllers/storage/delete")
const router = express.Router();
router.post("/", jwt.verify, del.delete);
module.exports = router;