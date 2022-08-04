const getView = require('../services/getview.service');
exports.getview = async (req, res) => {
    var Tags = req.body.category;
    var num = req.body.num;
    const result = await getView.getImages(tags,undefined,undefined,num);
    res.json(result);
}