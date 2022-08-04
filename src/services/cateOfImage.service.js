var db = require('../models/index');
const getRandImagesByTag = async (tags, num) => {
    try {
        var q = 'where ((categories.name =\'\'';
        if (tags.length !== 0)
        {
            q = 'where ((categories.name = \'' + tags[0] + '\'';
            for (let i = 1; i < tags.length; i++) {
                q = q + 'OR categories.name = \'' + tags[i] + '\'';
            }
        }
        q = q + ') and ';
        const images = await db.sequelize.query(`SELECT images.id 
                                                FROM images 
                                                WHERE(not exists(select categories.name 
                                                    from categories `+q+`(categories.name not in(select CateOfImages.nameCate from CateOfImages where CateOfImages.idImage = images.id))))) ORDER BY RAND() LIMIT ` + num)
        return images[0];
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getRandImagesByTag: getRandImagesByTag
}
