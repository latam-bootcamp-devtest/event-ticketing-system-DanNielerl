const Event = require('../models/EventModel');
const Ticket = require('../models/TicketModel');
const { Sequelize } = require('sequelize');

async function createTicket (data) {
    const event = await Event.findOne({
        where: {
          eventId: data.eventId,
        },
    });

    if(!event){ return {status: 404 , message: "Event not found"}};

    if(event.availableSeats === 0) { return { status: 409, message: "Conflict"}}

    Event.update(
        { availableSeats: event.availableSeats - 1 },
        {
          where: {
            eventId: data.eventId,
          },
        },
    );

    return await Ticket.create(data);
};

const deleteTicket = async (id) => {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) { return {status: 404 , message: "Ticket not found"}};
    const event = await Event.findOne({where: {date: { [Sequelize.Op.gt]: new Date },}})
    if (!event) { return {status: 400 , message: "Bad Request (Cannot cancel past events)"}}; 
    Event.update(
        { availableSeats: event.availableSeats +1 },
        {
          where: {
            eventId: ticket.eventId,
          },
        },
    );

    await Ticket.destroy({
        where: {
          ticketId: id,
        },
    });

    return ticket;
};

module.exports = {
    createTicket,
    deleteTicket
}