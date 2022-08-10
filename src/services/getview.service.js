var db = require('../models/index');
const getImages = async (tags,time,sortby,num) => {
    try {
        var q = 'where ((categories.name =\'\'';
        if (tags == undefined) { tags = [] }
        else
            tags = tags.split(',');
        if (tags.length !== 0)
        {
            q = 'where ((categories.name = \'' + tags[0] + '\'';
            for (let i = 1; i < tags.length; i++) {
                q = q + 'OR categories.name = \'' + tags[i] + '\'';
            }
        }
        q = q + ') and ';
        var sqlTime = '';
        if (time == 'month')
            sqlTime = ' and year(images.createdAt) = year(curdate()) and MONTH(images.createdAt) = month(curdate())';
        var sqlSort = ' RAND()';
        if (sortby == 'new')
            sqlSort = ' images.createdAt desc';
        if (sortby == 'like')
            sqlSort = ' images.numOfLike desc';
        if (sortby == 'star')
            sqlSort = ' images.numOfStar desc';
        if (num == undefined)
            num = 10;
        var images = await db.sequelize.query('SELECT images.id FROM images WHERE((not exists(select categories.name from categories '+q+'(categories.name not in(select CateOfImages.nameCate from CateOfImages where CateOfImages.idImage = images.id)))))'+sqlTime+') ORDER BY '+sqlSort+' LIMIT ' + num)
        images = images[0];
        for (let i = 0; i < images.length; i++) {
            let image = await db.Image.findOne({
                where: {
                    id: images[i].id
                }
            })
            images[i].numOfReport = image.numOfReport
        }
        return images;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getImages : getImages
}
