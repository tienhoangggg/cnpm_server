const getview = require('../services/storage/getview');
const getRandView = require('../services/cateOfImage.service');
exports.getview = async (req, res) => {
    const Tags = req.body.category;
    const listTag = Tags.split(',');
    list = {}
    const func1 = async () => {
    for (let i = 0; i < listTag.length; i++) {
        const func2 = async () => {
        listTag[i] = listTag[i].trim();
        const imagesid = await getRandView.getRandImagesByTag(listTag[i], parseInt(req.body[listTag[i]]));
        for(let j = 0; j < imagesid.length; j++){
        const func3 = async () => {
            const imageid = imagesid[j].idImage;
            image = await getview.getview(imageid);
            if (image) {
                if (list[listTag[i]]) {
                    list[listTag[i]].push(image)
                } else {
                    list[listTag[i]] = [image]
                }
            }
        }
        await func3();
    }}
        await func2();
    }}
    await func1();
    res.json(list);
}