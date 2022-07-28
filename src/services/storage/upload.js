const drive = require('../../config/ggdrive');
const db = require("../../models/index");
const { Readable } = require('stream');

//setfilepublic
const setFilePublic = async (fileId) => {
    await drive.permissions.create({
        fileId: fileId,
        resource: {
            role: 'reader',
            type: 'anyone'
        }
    });
}
//upload
const upload = async (file, fileName, fileType) => {
    const fileMetadata = {
        name: fileName
    };
    const media = {
        mimeType: fileType,
        body: Readable.from(file)


    };
    const filed = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });
    setFilePublic(filed.data.id);
    return filed.data.id;
}
//add db
const addDBimages = async (id, imageName, idUser, description) => {
    await db.Image.create({
        id: id,
        imageName: imageName,
        idUser: idUser,
        description: description
    })
};
//check tag
const checkTag = async (nameCate) => {
    const tag = await db.Category.findOne({
        where: {
            name: nameCate
        }
    })
    if (tag) {
        return true;
    } else {
        return false;
    }
}
//add tag
const addTag = async (nameCate, idImage) => {
    await db.CateOfImages.create({
        nameCate: nameCate,
        idImage: idImage
    })
}
module.exports = {
    upload: upload,
    addDBimages: addDBimages,
    addTag: addTag,
    checkTag: checkTag
}