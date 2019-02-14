const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { formatBooking, formatEvent } = require('./combine');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return formatBooking(booking);
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async args => {
    const retrievedEvent = await Event.findOne({_id: args.eventId});
    const booking = new Booking({
      user: '5c6593c8d3a597c94974973e',
      event: retrievedEvent
    });
    const result = await booking.save();
    return formatBooking(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = formatEvent(booking.event);
      await Booking.deleteOne({_id: args.bookingId});
      return event;
    } catch (err) {
      throw err
    }
  }
};
