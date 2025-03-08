var express = require('express');
var router = express.Router();
var eventServices = require('../services/EventServices');
const { body, validationResult } = require('express-validator');

router.get('/:userId/tickets', 
  (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pagesize = parseInt(req.query.pagesize, 10) || 10;
    console.log(req.params)
    // const events = await eventServices.getDynamicPaginatedHistory(page, pagesize);
    console.log(req.query)
    // res.status(200).json({currentPage: page, pageSize: pagesize, totalPages: (parseInt(events.count/pagesize) + 1), events});
  }
)


module.exports = router;
