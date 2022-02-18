const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

// This is how we define the different object types in the graph
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString }, // Cannot be "String", must be "GraphQLString" for GraphQL to work the way it's meant to
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  // this whole thing will be designed to handle the initial query keyword/object
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // when someone queries a particular book, an arg is expected
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id }); // we use lodash to find the specific book in the books array quickly, and return it within the resolve function
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
