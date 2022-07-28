const feedbackService = require("../services/feedback.services")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

let handleCreate = async(req, res)=>{
    try {
        let data = await feedbackService.createFeedback(req.idUser, req.body)
        return res.status(200).json({
            status: data,
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
            message: error
        })
    }
}

let handleDelete = async(req, res)=>{
    try {
        let data = await feedbackService.deleteFeedback(req.body.id)
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
            message: error
        })
    }
}

module.exports = {
    handleCreate: handleCreate,
    handleDelete: handleDelete
}