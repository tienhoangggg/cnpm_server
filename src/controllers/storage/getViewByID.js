const getview = require('../../services/storage/getview');
exports.getview = async (req, res) => {
    const fileId = req.body.fileId;
    const file = await getview.getview(fileId);
    res.json({ getview: file });
}