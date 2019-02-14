const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    date: String!
    contact: String!
    location: String!
    price_quote: Float!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  input EventInput {
    title: String!
    description: String!
    date: String!
    contact: String!
    location: String!
    price_quote: Float!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
