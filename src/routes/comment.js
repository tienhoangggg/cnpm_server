const express = require("express");
const commentController = require("../controllers/comment.controller");
const jwt = require("../middleware/jwt");
const router = express.Router();

router.post("/create", commentController.createComment);
router.get("/read/:id", commentController.readComment);


module.exports = router;