const searchService = require("../services/search.services")
const env = require("dotenv").config()

let get = async (req, res)=>{
    try {
        let data = await searchService.idOrName(req.params.key)
        
        return res.status(200).json({
            data: data,
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

module.exports = {
    get: get
}