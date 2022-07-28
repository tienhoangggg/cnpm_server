const express = require("express");
const jwt = require("../../middleware/jwt");
const multer = require("../../middleware/formDataUpload");
const up = require("../../controllers/storage/upload");
const router = express.Router();

router.post("/", jwt.verify, multer.single('file'), up.upload);

module.exports = router;