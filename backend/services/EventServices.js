const Event = require('../models/EventModel');
const { Sequelize } = require('sequelize');

async function createEvent (data) {

    return await Event.create(data);
};

const getDynamicPaginatedEvents = async (page, pageSize) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    
    where = {
            date: { [Sequelize.Op.gt]: new Date },
    };

    return await Event.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
        order: [['date', 'ASC']],
    });
};

module.exports = {
    createEvent,
    getDynamicPaginatedEvents
}