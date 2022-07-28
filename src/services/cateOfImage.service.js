const db = require('../models/index');
const Sequelize = require('sequelize');
const getRandImagesByTag = async (tag, num) => {
    try {
        const images = await db.CateOfImages.findAll({
            attributes: ['idImage'],
            where: {
                nameCate: tag
            },
            order: Sequelize.literal('rand()'),
            limit: num,
            raw: true
        });
        return images;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getRandImagesByTag: getRandImagesByTag
}
