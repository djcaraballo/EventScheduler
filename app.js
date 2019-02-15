const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event')

const app = express();


app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      date: String!
      contact: String!
      location: String!
      price_quote: Float!
    }

    input EventInput {
      title: String!
      description: String!
      date: String!
      contact: String!
      location: String!
      price_quote: Float!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return { ...event._doc, _id: event.id };
          });
        })
        .catch(err => {
          throw err;
        })
    },
    createEvent: args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        date: new Date(args.eventInput.date),
        contact: args.eventInput.contact,
        location: args.eventInput.location,
        price_quote: +args.eventInput.price_quote
      });
      return event
        .save()
        .then(result => {
          console.log(result);
          return { ...result._doc, _id: result.id };
        })
        .catch(err => {
          console.log(err)
          throw err;
        });
    }
  },
  graphiql: true
}));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-bhw1e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
