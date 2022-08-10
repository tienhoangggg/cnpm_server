const alternative = require("../services/alternative.service")

const add = async (req, res) => {
    try {
        const idImage1 = req.body.idImageRoot
        const idImage2 = req.body.idImageAlter
        const result = await alternative.CreateAlternative(req.idUser, idImage1, idImage2)
        if(result){
            res.status(200).json({
                message: "Create alternative success"
            })
        }else{
            res.status(400).json({
                message: "Create alternative failedaa"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Create alternative failedbb",
            error
        })
    }
}

const get = async (req, res) => {
    try {
        const idImage = req.body.idImageRoot
        const alternatives = await alternative.GetAlternative(idImage)
        if(alternatives){
        res.status(200).json({
            message: "Get alternative success",
            idImageAlter: alternatives
        })}else{
            res.status(400).json({
                message: "Get alternative failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Get alternative failed",
            error
        })
    }
}

module.exports = {
    add : add,
    get : get
}