const star = require("../services/star.service");

const get = async (req, res) => {
    try{
    const stars = await star.getStarByUser(req.idUser);
    res.status(200).json(stars);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    get : get
}