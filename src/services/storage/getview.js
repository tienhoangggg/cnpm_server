const drive = require('../../config/ggdrive');

//getview
const getview = async (fileId) => {
    const file = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink'
    });
    return file.data.webViewLink;
}
module.exports = {
    getview: getview
}