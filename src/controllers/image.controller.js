const imageService = require("../services/image.services")
const env = require("dotenv").config()

let like = async (req, res)=>{
    try{
        let data = await imageService.imageLike()
    } catch(error){
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let dislike = async (req, res)=>{
    try{

    } catch(error){
        return res.status(400).json({
            status: "error from server",
        })
    }
}

module.exports = {
    like: like,
    dislike: dislike,
}
