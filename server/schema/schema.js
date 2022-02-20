const graphql = require("graphql");
const _ = require("lodash");
const book = require('../models/book')
const author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;



// This is how we define the different object types in the graph
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // Cannot be "String", must be "GraphQLString" for GraphQL to work the way it's meant to
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  // this whole thing will be designed to handle the initial query keyword/object
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // when someone queries a particular book, an arg is expected
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id }); // we use lodash to find the specific book in the books array quickly, and return it within the resolve function
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
