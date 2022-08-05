const drive = require('../../config/ggdrive');
const db = require("../../models/index");

const checkUser = async (userID, fileID) => {
    let check = await db.sequelize.query(`SELECT * FROM images WHERE ((id = '${fileID}' AND idUser = ${userID}) or exists(select * from users where id = ${userID} and id = 1))`);
    if(check){
            return true;
        }
        else {
            return false;
        }
}

const deleteFile = async (fileId) => {
    await drive.files.delete({
        fileId: fileId
    });
}
const delDBImages = async (fileID) => {
    await db.Image.destroy({
        where: {
            id: fileID
        }
    });
}
const delCateOfImages = async (fileID) => {
    await db.CateOfImages.destroy({
        where: {
            IDimage: fileID
        }
    });
}
module.exports = {
    checkUser: checkUser,
    deleteFile: deleteFile,
    delDBImages: delDBImages,
    delCateOfImages: delCateOfImages
}