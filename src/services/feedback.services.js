let db = require("../models/index")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")
const env = require("dotenv").config()

function checkIdUser(idUser) {
    return new Promise(async (resolve, reject)=>{
        try {
            let id = await db.Feedback.findOne({
                where: {idUser: idUser}
            })
            if(id){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createFeedback = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let isExist = await checkIdUser(id)
            if(isExist){
                await db.Feedback.update({
                    rating: data.rating,
                    text: data.description,
                },{
                    where: {idUser: id}
                })
            }
            else{
                await db.Feedback.create({
                    rating: data.rating,
                    idUser: id,
                    text: data.description,
                })
            }
            resolve('success')
        } catch (error) {
            reject(error)
        }
    })
}

let deleteFeedback = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let data = {}
            let feedback = await db.Feedback.findOne({
                where: {id: id, role: true}
            })

            if(feedback){
                await feedback.destroy();
                data.status = 'success'
                data.message = 'Deleting feedback success.'
                resolve(data)
            }
            else{
                data.status = 'error'
                data.message = 'Deleting feedback failed.'
                resolve(data)
            }
            
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createFeedback: createFeedback,
    deleteFeedback: deleteFeedback,
}