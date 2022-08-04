const { resolve } = require("path")
let db = require("../models/index")
const env = require("dotenv").config()
const Op = require('Sequelize').Op

function imageLike(idUser, idImage){
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            let isExist = checkIdUser(idUser)
            if(isExist){
                isExist = checkIdImage(idImage)
                if(isExist){
                    await db.Like.create({
                        idImage: idImage,
                        idUser: idUser
                    })
                    let image = await db.Image.findOne({
                        where: {id: idImage}
                    })
                    image.numOfLike = image.numOfLike + 1
                    image.save()
                    data.status = "success"
                    data.message = "create like successfully"
                }else{
                    data.status = "error"
                    data.message = "create like fail"
                }
            }else{
                data.status = "error"
                data.message = "create like fail"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function imageStar(idUser, idImage){
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            let isExist = checkIdUser(idUser)
            if(isExist){
                isExist = checkIdImage(idImage)
                if(isExist){
                    await db.Star.create({
                        idImage: idImage,
                        idUser: idUser
                    })
                    let image = await db.Image.findOne({
                        where: {id: idImage}
                    })
                    image.numOfStar = image.numOfStar + 1
                    image.save()
                    data.status = "success"
                    data.message = "create star successfully"
                }else{
                    data.status = "error"
                    data.message = "create star fail"
                }
            }else{
                data.status = "error"
                data.message = "create star fail"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function imageDislike(idUser, idImage){
    return new Promise(async(resolve, reject)=>{
        try {
            let data = {}
            let isExist = await db.Like.findOne({
                where: {
                    idUser: idUser,
                    IdImage: idImage
                }
            })
            if (isExist){
                await isExist.destroy();
                let image = await db.Image.findOne({
                    where: {id: idImage}
                })
                image.numOfLike = image.numOfLike - 1
                image.save()
                data.status = "success"
                data.message = "dislike successfully"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function deleteStar(idUser, idImage){
    return new Promise(async(resolve, reject)=>{
        try {
            let data = {}
            let isExist = await db.Star.findOne({
                where: {
                    idUser: idUser,
                    IdImage: idImage
                }
            })
            if (isExist){
                await isExist.destroy();
                let image = await db.Star.findOne({
                    where: {id: idImage}
                })
                image.numOfStar = image.numOfStar - 1
                image.save()
                data.status = "success"
                data.message = "delete star successfully"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function checkIdUser(IdUser) {
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {id: IdUser}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

function checkIdImage(idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            let image = await db.Image.findOne({
                where: {id: idImage}
            })
            if(image){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    imageLike: imageLike,
    imageStar: imageStar,
    imageDislike: imageDislike,
    deleteStar: deleteStar
}