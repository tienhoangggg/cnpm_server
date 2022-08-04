const imageService = require("../services/image.services")
const env = require("dotenv").config()

let like = async (req, res)=>{
    try{
        let data = await imageService.imageLike(req.idUser, req.body.idImage)
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    } catch(error){
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let star = async (req, res)=>{
    try{
        let data = await imageService.imageStar(req.idUser, req.body.idImage)
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    } catch(error){
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let dislike = async (req, res)=>{
    try{
        let data = await imageService.imageDislike(req.idUser, req.body.idImage)
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    } catch(error){
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let deleteStar = async(req, res)=>{
    try {
        let data = await imageService.imageDeleteStar(req.idUser, req.body.idImage)
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

module.exports = {
    like: like,
    star: star,
    dislike: dislike,
    deleteStar: deleteStar
}
