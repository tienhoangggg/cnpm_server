const express = require("express");
const jwt = require("../../middleware/jwt");
const view = require("../../controllers/storage/getViewByID")
const router = express.Router();
router.post("/", jwt.verify, view.getview);
module.exports = router;