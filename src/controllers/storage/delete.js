const del = require("../../services/storage/delete");
exports.delete = async (req, res) => {
    const fileId = req.body.fileId;
    const checkUser = await del.checkUser(req.idUser, fileId);
    if (checkUser) {
        del.deleteFile(fileId);
        del.delDBImages(fileId);
        del.delCateOfImages(fileId);
        res.json({ status: 'success' });
    }
    else {
        res.json({ status: 'fail' });
    }
}