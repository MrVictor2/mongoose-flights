const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    airport: {type: String, enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]},
    arrival: Date
}, {timestamps: true});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
  },
  
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000),
  },
  price: {
    type: Number,
    required: true,
  },
  destinations: [destinationSchema]
});

const flights = mongoose.model('Flight', flightSchema);

module.exports = flights;
