const getView = require('../services/getview.service');
exports.getview = async (req, res) => {
    var tags = req.body.category;
    var num = req.body.num;
    var sortby = req.body.sortby;
    var time = req.body.time;
    const result = await getView.getImages(tags,time,sortby,num);
    res.json(result);
}