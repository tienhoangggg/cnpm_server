let db = require("../models/index")

function CreateAlternative (idUser, idImage1, idImage2) {
    return new Promise(async (resolve, reject)=>{
        try {
            const check1 = await checkIdImage(idImage1)
            const check2 = await checkIdImage(idImage2)
            const checkOwner1 = await checkOwner(idUser,idImage1)
            const checkOwner2 = await checkOwner(idUser,idImage2)
            if(check1 && check2 && checkOwner1 && checkOwner2){
                db.Alternative.create({
                    idImageRoot: idImage1,
                    idImageAlter: idImage2
                })
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

function GetAlternative (idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            var alternatives = await db.Alternative.findAll({
                where: {idImageRoot: idImage}
            })
            for (let i = 0; i < alternatives.length; i++) {
                alternatives[i] = alternatives[i].idImageAlter
            }
            resolve(alternatives)
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

function checkOwner(idUser,idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            const owner = await db.Image.findOne({
                where: {id: idImage}
            })
            if(owner.idUser === idUser){
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
    CreateAlternative : CreateAlternative,
    GetAlternative : GetAlternative
}