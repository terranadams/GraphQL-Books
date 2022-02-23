import { gql } from "@apollo/client";


const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
        name
        id
    }
  }
`

const GET_BOOK_QUERY = gql`
  query($id: ID) {
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY, ADD_BOOK_MUTATION, GET_BOOK_QUERY };