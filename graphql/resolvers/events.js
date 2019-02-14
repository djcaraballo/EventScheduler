const Event = require('../../models/event');
const { formatEvent } = require('./combine');

module.exports = {
  events: async () => {
    try {
      const events = await  Event.find()
      return events.map(event => {
        return formatEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      date: new Date(args.eventInput.date),
      contact: args.eventInput.contact,
      location: args.eventInput.location,
      price_quote: +args.eventInput.price_quote,
      creator: '5c6593c8d3a597c94974973e'
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = formatEvent(result);
      const creator = await  User.findById('5c6593c8d3a597c94974973e');

      if (!creator) {
        throw new Error('User not found.')
      }

      creator.createdEvents.push(event.id);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
