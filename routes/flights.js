const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights'); // Import the flights controller module

// GET /flights
router.get('/', flightsCtrl.index);

// GET /flights/new
router.get('/new', flightsCtrl.new);

// GET /flights/:id (show functionality) MUST be below new route
router.get('/:id', flightsCtrl.show);

// POST /flights
router.post('/', flightsCtrl.create);

// POST /flights/:id/destinations (add destination functionality)
router.post('/:id/destinations', flightsCtrl.addDestination);

//Route to handle ticket creation
router.post('/:id/tickets', flightsCtrl.createTicket);

module.exports = router;
