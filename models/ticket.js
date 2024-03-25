const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    validate: {
      validator: function(value) {
        return /^[A-F][1-9][0-9]?$/.test(value);
      },
      message: 'Seat must be from A1 to F99'
    },
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  }
});

const tickets = mongoose.model('Ticket', ticketSchema);

module.exports = tickets;
