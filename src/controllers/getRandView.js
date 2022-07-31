const getRandView = require('../services/cateOfImage.service');
exports.getview = async (req, res) => {
    const Tags = req.body.category;
    const listTag = Tags.split(',');
    list = {}
    res.json(list);
}