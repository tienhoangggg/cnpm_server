const commentService = require("../services/comment.services")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

let createComment = async(req, res)=>{
    try {
        let commentData = await commentService.commentCreate(req.body)
        return res.status(200).json({
            status: commentData.status,
            message: commentData.message
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let readComment = async(req, res)=>{
    try {
        // console.log(req.body.idImage)
        let commentData = await commentService.commentRead(req.params.id, req.body)
        return res.status(200).json({
            status: 'success',
            message: 'read comment successfully',
            like: commentData.like,
            star: commentData.star,
            idAvatar: commentData.idAvatar,
            username: commentData.username,
            content: commentData.content,
            updatedAt: commentData.updatedAt,
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

module.exports = {
    createComment: createComment,
    readComment: readComment
}