let db = require("../models/index")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")
const env = require("dotenv").config()
const Op = require('Sequelize').Op

function idOrName(idName){
    return new Promise(async (resolve, reject)=>{
        try {
            let data = await db.Image.findAll({
                where: {
                    [Op.or]: [
                        { id: {
                            [Op.substring]: idName
                        } },
                        { imageName: {
                            [Op.substring]: idName
                        }}
                    ]   
                }
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    idOrName: idOrName
}