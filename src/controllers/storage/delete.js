const del = require("../../services/storage/delete");
exports.delete = async (req, res) => {
    const fileId = req.body.fileId;
    const checkUser = await del.checkUser(req.idUser, fileId);
    if (checkUser) {
        await del.deleteFile(fileId);
        await del.delDB(fileId);
        await del.delCateOfImages(fileId);
        res.json({ status: 'success' });
    }
    else {
        res.json({ status: 'fail' });
    }
}