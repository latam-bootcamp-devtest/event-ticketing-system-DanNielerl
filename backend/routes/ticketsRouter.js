var express = require('express');
var router = express.Router();
var eventServices = require('../services/EventServices');
var ticketServices = require('../services/TicketServices');


router.post('/',
    async (req, res, next) => {
      const response = await ticketServices.createTicket(req.body);
      if(response.status) { res.status(response.status).json({message: response.message})}
      res.status(201).json(response);
    }
);

module.exports = router;