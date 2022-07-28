const download = require('../../services/storage/download');
exports.download = async (req, res) => {
    const fileId = req.body.fileId;
    const file = await download.downloadFile(fileId);
    res.json({ download: file });
}