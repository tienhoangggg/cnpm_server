const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
let app = express();
const connectDB = require("./config/db-config");
// var cors = require('cors')
// app.use(cors());
app.use(cookie());
connectDB();

app.set('port', (process.env.PORT || 8888));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use('/users', require("./routes/users"));

app.use('/feedback', require("./routes/feedback"));
app.use('/category', require("./routes/category"));
app.use('/randview', require("./routes/randView"));
app.use('/upload', require('./routes/storage/upload'));
app.use('/delete', require('./routes/storage/delete'));
app.use('/search', require('./routes/search'));


// var OPTIONS = {
//     key: fs.readFileSync(path.join(__dirname, '../key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
// };
// var server = https.createServer(OPTIONS, app);
// server.listen(app.get('port'), function () {
//     console.log('Server started on port: ' + app.get('port'));
// });
var httpserver = http.createServer(app);
httpserver.listen(app.get('port'), function () {
    console.log('Server started on port: ' + app.get('port'));
});