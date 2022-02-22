const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

// allow cross-origin request
app.use(cors())

mongoose.connect('mongodb+srv://terranadams:rosesarered4@graphqlbooks.ydtqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
  console.log('Connected to db')
})

app.use(
  "/graphql",
  graphqlHTTP({
    // schema: schema ....this is pre ES6
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Listening for requests on port 4000"));
