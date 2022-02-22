import React from "react";
import { gql, useQuery } from "@apollo/client";
// import { graphql } from "graphql";

const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY); // this hook is EVERYTHING

  const displayBooks = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };

  return (
    <div>
      {console.log(data)}
      <ul id="book-list">
        {displayBooks()} {/* this function must be called in forder for it to work */}
      </ul>
    </div>
  );
};

export default BookList;
