const drive = require('../../config/ggdrive');

//downloadfile
const downloadFile = async (fileId) => {
    const file = await drive.files.get({
        fileId: fileId,
        fields: 'webContentLink'
    });
    return file.data.webContentLink;
}
module.exports = {
    downloadFile: downloadFile
}