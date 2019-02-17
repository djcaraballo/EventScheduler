const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { formatBooking, formatEvent } = require('./combine');

module.exports = {
  bookings: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated user!')
    }

    try {
      const bookings = await Booking.find({user: req.userId});
      return bookings.map(booking => {
        return formatBooking(booking);
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated user!')
    }

    const retrievedEvent = await Event.findOne({_id: args.eventId});
    const booking = new Booking({
      user: req.userId,
      event: retrievedEvent
    });
    const result = await booking.save();
    return formatBooking(result);
  },
  cancelBooking: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated user!')
    }

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
