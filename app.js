const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

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
      return events;
    },
    createEvent: (args) => {
      const event = {
        _id: Math.random().toString(),
        title: args.eventInput.title,
        description: args.eventInput.description,
        date: new Date().toISOString(),
        contact: args.eventInput.contact,
        location: args.eventInput.location,
        price_quote: +args.eventInput.price_quote
      };
      events.push(event);
      return event;
    }
  },
  graphiql: true
}));

app.listen(4000);
