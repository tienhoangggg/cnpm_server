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
        let data = await imageService.imageDisStar(req.idUser, req.body.idImage)
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

let report = async(req, res)=>{
    try {
        console.log(req.body.idImage)
        let data = await imageService.imageReport(req.body.idImage)
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

let getImage = async(req,res)=>{
    try {
        console.log(req.params.idImage)
        let image = await imageService.imageGet(req.params.idImage)
        return res.status(200).json({
            errCode: 0,
            status: 'success',
            image: image
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

const check = async (req, res)=>{
    try {
        let check1 = await imageService.checkLike(req.idUser, req.body.idImage)
        let check2 = await imageService.checkStar(req.idUser, req.body.idImage)
        var like, star
        if(check1){
            like = 1
        }else{
            like = 0
        }
        if(check2){
            star = 1
        }else{
            star = 0
        }
        return res.status(200).json({
            like : like,
            star : star
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
    deleteStar: deleteStar,
    report: report,
    getImage: getImage,
    check: check
}
