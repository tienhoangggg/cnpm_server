const express = require("express");
const image = require("../controllers/image.controller");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.post("/like", jwt.verify, image.like);
router.post("/star", jwt.verify, image.star);
router.post("/dislike", jwt.verify, image.dislike);
router.post("/deleteStar", jwt.verify, image.deleteStar);
router.post("/report", image.report);
router.get("/getImage/:idImage", image.getImage)
router.post("/check",jwt.verify, image.check);


module.exports = router;