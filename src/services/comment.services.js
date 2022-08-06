let db = require("../models/index")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")
const { rejects } = require("assert")
const env = require("dotenv").config()

function commentCreate(data) {
    return new Promise(async(resolve, reject)=>{
        try {
            let commentData = {}
            await db.Comment.create({
                idImage: data.idImage,
                idAvatar: data.idAvatar,
                username: data.username,
                content: data.content
            })
            commentData.status = "success"
            commentData.message = "create comment successfully"
            resolve(commentData)
        } catch (error) {
            reject(error)
        }
    })
}

function commentRead(id, data){
    return new Promise(async(resolve, reject)=>{
        try {
            let comment = {};
            let idAvatar = [];
            let username = [];
            let content = [];
            let updatedAt = [];
            comment = await db.Comment.findAll({
                where: {idImage: id},
                raw: true
            })
            // console.log(comment)
            findImage = await db.Image.findOne({
                where: {id: id},
                raw: true
            })
            console.log(findImage)
            for(const element of comment){
                idAvatar.push(element.idAvatar)
                username.push(element.username)
                content.push(element.content)
                updatedAt.push(element.updatedAt)
            }
            comment.like = findImage.numOfLike
            comment.star = findImage.numOfStar
            comment.idAvatar = idAvatar
            comment.username = username
            comment.content = content
            comment.updatedAt = updatedAt
            resolve(comment)
        } catch (error) {
            reject(error)
        }
    })
}


function checkidImage(idImage) {
    return new Promise(async (resolve, reject)=>{
        try {
            let image = await db.Comment.findOne({
                where: {idImage: idImage}
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
    commentCreate: commentCreate,
    commentRead: commentRead
}