const drive = require('../../config/ggdrive');
const db = require("../../models/index");

const checkUser = async (userID, fileID) => {
    await db.Image.findOne({
        where: {
            id: fileID,
            idUser: userID
        }
    }).then(async (image) => {
        if (image) {
            return true;
        }
        else {
            return false;
        }
    }
    ).catch(err => {
        console.log(err);
    }
    )
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