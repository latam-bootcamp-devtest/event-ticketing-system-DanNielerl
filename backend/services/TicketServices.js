const Event = require('../models/EventModel');
const Ticket = require('../models/TicketModel');
const { Sequelize } = require('sequelize');

async function createTicket (data) {
    const event = await Event.findOne({
        where: {
          eventId: data.eventId,
        },
    });

    if(!event){ return {status: 404 , message: "Event not found"}}

    if(event.availableSeats === 0) { return { status: 409, message: "Conflict"}}

    return await Ticket.create(data);
};


module.exports = {
    createTicket
}