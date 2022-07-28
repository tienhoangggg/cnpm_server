const {google} = require('googleapis');
const dotenv = require('dotenv').config();
const OAuth2 = google.auth.OAuth2;
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});
const drive = google.drive({ version: 'v3', auth: oauth2Client });
module.exports = drive