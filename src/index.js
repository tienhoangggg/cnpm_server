const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
var app = express();
app.use(cookie());
const connectDB = require("./config/db-config");
connectDB();
var cors = require('cors')
app.use(cors(
    {
        origin: 'https://wibuwallpaper.azurewebsites.net',
        credentials: true,
        exposedHeaders: ["set-cookie"],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', require("./routes/users"));
app.use('/feedback', require("./routes/feedback"));
app.use('/category', require("./routes/category"));
app.use('/getview', require("./routes/view"));
app.use('/upload', require('./routes/storage/upload'));
app.use('/delete', require('./routes/storage/delete'));
app.use('/search', require('./routes/search'));
app.use('/comment', require('./routes/comment'));
app.use('/image', require('./routes/image'));
app.use('/alternative', require('./routes/alternative'));
app.use('/star', require('./routes/star'));
// // var OPTIONS = {
// //     key: fs.readFileSync(path.join(__dirname, '../key.pem')),
// //     cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
// // };
// // var server = https.createServer(OPTIONS, app);
// // server.listen(app.get('port'), function () {
// //     console.log('Server started on port: ' + app.get('port'));
// // });
app.set('port', process.env.PORT || 8888);
app.listen(app.get('port'), function () {
    console.log('Server started on port: ' + app.get('port'));
});