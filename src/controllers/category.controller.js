const categoryService = require("../services/category.services")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

let handleCreate = async(req, res)=>{
    try {
        let data = await categoryService.createCategory(req.body.category, req.idUser)
        return res.status(200).json({
            status: data
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
        let data = await categoryService.deleteCategory(req.body.category, req.idUser)
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

let handleRead = async(req, res)=>{
    try {
        let data = await categoryService.readCategory()
        return res.status(200).json({
            status: "success",
            message: "read category successfully",
            id: data.id,
            name: data.name
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
    handleDelete: handleDelete,
    handleRead: handleRead
}