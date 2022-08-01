'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res) {
    res.status(200).json({
        message: 'Welcome to the API'
    });
});

module.exports = router;
