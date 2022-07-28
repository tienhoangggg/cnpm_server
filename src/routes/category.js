const express = require('express');
const jwt = require("../middleware/jwt");
const categoryController = require("../controllers/category.controller")

const router = express.Router()


router.post('/create', jwt.verify, categoryController.handleCreate)
router.post('/delete', jwt.verify,categoryController.handleDelete)



module.exports = router;