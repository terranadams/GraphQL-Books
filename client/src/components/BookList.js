import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {

  // The query below is ran as soon as the component mounts

  const { loading, error, data } = useQuery(GET_BOOKS_QUERY); 

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

  const displayBookDetails = () => { // this function must be called in the return statement for anything in this function to show
      if (!selected) return <h4>Select a book :)</h4>
      else return <BookDetails bookId={selected} />
  }

  return (
    <div>
      {/* {console.log(data)} */}
      <ul id="book-list">
        {displayBooks()} {/* These functions need to be called, not referred */}
      </ul>
      {displayBookDetails()}
    </div>
  );
};

export default BookList;
