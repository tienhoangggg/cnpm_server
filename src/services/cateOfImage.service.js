const db = require('../models/index');
const Sequelize = require('sequelize');
const getRandImagesByTag = async (tags, num) => {
    try {
        var q;
        if (tags.length === 0) {
            q = '1 = 1'
        }
        else {
            q = 'categories.name = ' + tags[0];
            for (let i = 1; i < tags.length; i++) {
                q = q + 'OR categories.name = ' + tags[i]
            }
        }
        const images = await db.query(`SELECT images.id FROM images WHERE(not exists((select categories.name from categories where ${q})except(select CateOfImages.nameCate from CateOfImages where CateOfImages.idImage = images.id))) ORDER BY RAND() LIMIT ${num}`);
        return images;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getRandImagesByTag: getRandImagesByTag
}
