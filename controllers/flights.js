const Flight = require('../models/flights');

module.exports = {
  index,
  show,
  new: newFlight,
  create
};

  // GET /flights
  async index(req, res, next) {
      const flights = await Flight.find({});
      res.render('flights/index', { flights });
  },

  // GET /flights/new
  new(req, res) {
    res.render('flights/new');
  },
  // GET /flights/:id (show functionality)
  async show(req, res, next) {
      const flight = await Flight.findById(req.params.id) .populate('flight details');

  // POST /flights
  async create(req, res, next) {
      const { airline, flightNo, airport, departs, price, destination } = req.body;
      const newFlight = new Flight({ airline, flightNo, airport, departs, price, destination });
       newFlight.save();
      res.redirect('/flights');
  }
};
