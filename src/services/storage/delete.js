const drive = require('../../config/ggdrive');
const db = require("../../models/index");
const OP = require('sequelize').Op;

const checkUser = async (userID, fileID) => {
    try{
    let check = await db.sequelize.query(`SELECT * FROM images WHERE ((id = '${fileID}' AND idUser = ${userID}) or exists(select * from users where id = ${userID} and id = 1))`);
    if(check){
            return true;
        }
        else {
            return false;
        }
    }
    catch(err){
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
const delAlterOfImages = async (fileID) => {
    await db.Alternative.destroy({
        where: {
            [OP.or]: [{
                idImageRoot: fileID
            }, {
                idImageAlter: fileID
            }]
        }
    });
}
const delStarOfImages = async (fileID) => {
    await db.Star.destroy({
        where: {
            idImage: fileID
        }
    });
}
const delCommentOfImages = async (fileID) => {
    await db.Comment.destroy({
        where: {
            idImage: fileID
        }
    });
}
const delLikeOfImages = async (fileID) => {
    await db.Like.destroy({
        where: {
            idImage: fileID
        }
    });
}
module.exports = {
    checkUser: checkUser,
    deleteFile: deleteFile,
    delDBImages: delDBImages,
    delCateOfImages: delCateOfImages,
    delAlterOfImages: delAlterOfImages,
    delStarOfImages: delStarOfImages,
    delCommentOfImages: delCommentOfImages,
    delLikeOfImages: delLikeOfImages
}