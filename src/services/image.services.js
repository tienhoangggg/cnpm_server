const { resolve } = require("path")
let db = require("../models/index")
const env = require("dotenv").config()
const Op = require('Sequelize').Op

function imageLike(idUser, idImage){
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            let check = await checkIdUser(idUser)
            if(check){
                check = await checkIdImage(idImage)
                if(check){
                    check = await checkLike(idUser, idImage)
                    if(!check){
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
                    data.message = "image already like"
                }
                }else{
                    data.status = "error"
                    data.message = "image not found"
                }
            }else{
                data.status = "error"
                data.message = "user not found"
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
            let check = await checkIdUser(idUser)
            if(check){
                check = await checkIdImage(idImage)
                if(check){
                    check = await checkStar(idUser, idImage)
                    if(!check){
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
                    data.message = "image already star"
                }
                }else{
                    data.status = "error"
                    data.message = "image not found"
                }
            }else{
                data.status = "error"
                data.message = "user not found"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function imageReport(idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            isExist = checkIdImage(idImage)
            if(isExist){
                let image = await db.Image.findOne({
                    where: {id: idImage}
                })
                image.numOfReport = image.numOfReport + 1
                image.save()
                data.status = "success"
                data.message = "report image successfully"
            }else{
                data.status = "error"
                data.message = "report image fail"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function imageGet(idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            console.log(idImage)
            let image = await db.Image.findOne({
                where: {id: idImage}
            })
            resolve(image)
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

function imageDisStar(idUser, idImage){
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
                let image = await db.Image.findOne({
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

function checkLike(idUser, idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            let isExist = await db.Like.findOne({
                where: {
                    idUser: idUser,
                    IdImage: idImage
                }
            })
            if(isExist){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

function checkStar(idUser, idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            let isExist = await db.Star.findOne({
                where: {
                    idUser: idUser,
                    IdImage: idImage
                }
            })
            if(isExist){
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
    imageDisStar: imageDisStar,
    imageReport: imageReport,
    imageGet: imageGet,
    checkLike: checkLike,
    checkStar: checkStar
}