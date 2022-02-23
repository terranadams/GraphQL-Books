import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY); // this hook is EVERYTHING

  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    else {
      return data.books.map((book) => {
        return (
          <li onClick={() => setSelected(book.id)} key={book.id}>
            {book.name}
          </li>
        );
      });
    }
  };

  const displayBookDetails = () => {
      if (!selected) return <h4>Select a book :)</h4>
      else return <BookDetails bookId={selected} />
  }

  return (
    <div>
      {/* {console.log(data)} */}
      <ul id="book-list">
        {displayBooks()}
        {/* this function must be called in forder for it to work */}
      </ul>
      {displayBookDetails()}
    </div>
  );
};

export default BookList;
