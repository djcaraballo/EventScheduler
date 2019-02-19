const bodyParser = require('body-parser');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphQLResolvers = require('./graphql/resolvers/index');
const graphQLSchema = require('./graphql/schema/index');
const userAuth = require('./middleware/userAuth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if(req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(userAuth);

app.use('/api', graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-bhw1e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
