var express = require('express');
var router = express.Router();
var eventServices = require('../services/EventServices');
const { body, validationResult } = require('express-validator');
/* const today = new Date(); */
/* GET home page. */
router.post('/',[
        body('date').isDate().isAfter(new Date().toDateString()).withMessage("Events with a past date aren't accepted"),
        body('availableSeats').isInt({min: 1}).withMessage("Available Seats must be greater than 0"),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      // IF NO ERRORS, MOVE TO NEXT MIDDLEWARE
      next(); 
    },
    async (req, res, next) => {
      const events = await eventServices.createEvent(req.body);
      console.log(events);
      
      res.status(201).json(events);
    }
);

router.get('/', 
  async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pagesize = parseInt(req.query.pagesize, 10) || 10;
    const offset = (page - 1) * pagesize;

    const events = await eventServices.getDynamicPaginatedEvents(page, pagesize);
    // console.log(events.count)
    res.status(200).json({currentPage: page, pageSize: pagesize, totalPages: (parseInt(events.count/pagesize) + 1), events});
  }
)

module.exports = router;
