let db = require("../models/index")

function getStarByUser(idUser) {
    return new Promise(async (resolve, reject)=>{
        try {
            var stars = await db.Star.findAll({
                where: {idUser: idUser}
            })
            for (let i = 0; i < stars.length; i++) {
                stars[i] = stars[i].idImage
            }
            resolve(stars)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getStarByUser : getStarByUser
}