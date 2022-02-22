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
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  return (
    <div>
      {console.log(data)}
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </div>
  );
};

export default BookList;
