const Flight = require('../models/flights');
const Ticket = require('../models/ticket');


// Index Route: Show all flights
async function index(req, res) {
  try {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).send('Internal Server Error');
  }
}

// New Route: Show form to add a new flight
function newFlight(req, res) {
  res.render('flights/new');
}

// Show Route: Show details of a specific flight
async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send('Flight not found');
    }

    const tickets = await Ticket.find({ flight: flight._id });

    res.render('flights/show', { flight, tickets });
  } catch (err) {
    console.error('Error fetching flight details:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Create Route: Add a new flight
async function create(req, res) {
  try {
    const { airline, flightNo, airport, departs, price, destination } = req.body;
    const newFlight = new Flight({ airline, flightNo, airport, departs, price, destination });
    await newFlight.save();
    res.redirect('/flights');
  } catch (err) {
    console.error('Error adding new flight:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Add Destination Route: Add a destination to a flight
async function addDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send('Flight not found');
    }

    const { airport, arrival } = req.body;
    flight.destinations.push({ airport, arrival });
    await flight.save();
    
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error('Error adding destination:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Create Ticket Route: Add a new ticket for a flight
async function createTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const { seat, price } = req.body;
    const ticket = new Ticket({ seat, price, flight: flight._id });
    await ticket.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  index,
  new: newFlight,
  show,
  create,
  addDestination,
  createTicket
};
