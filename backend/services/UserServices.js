const Event = require('../models/EventModel');
const Ticket = require('../models/TicketModel');
const { Sequelize } = require('sequelize');

const getDynamicPaginatedHistory = async (page, pageSize) => {
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
    getDynamicPaginatedHistory
}