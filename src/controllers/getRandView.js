const getRandView = require('../services/cateOfImage.service');
exports.getview = async (req, res) => {
    var Tags = req.body.category;
    if (Tags == undefined) { Tags = [] }
    else { Tags = Tags.split(',') }
    var num = req.body.num;
    if (num == undefined) {
        num = 10;
    }
    const result = await getRandView.getRandImagesByTag(Tags, num);
    res.json(result);
}