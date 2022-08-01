const getRandView = require('../services/cateOfImage.service');
exports.getview = async (req, res) => {
    const Tags = req.body.category;
    const listTag = Tags.split(',');
    const num = req.body.num;
    const result = await getRandView.getRandView(listTag, num);
    res.json(result);
}