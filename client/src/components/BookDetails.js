import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_QUERY } from "../queries/queries";

const BookDetails = (props) => {
  const getBookHook = useQuery(GET_BOOK_QUERY, {
    variables: {id: props.bookId},
  }); //const { loading, error, data } = useQuery(GET_BOOK_QUERY)

//   const displayBookDetails = () => {
//     let {book} = getBookHook.data
//     if (book) {
//         return (
//             <div>
//                 <h2>{book.name}</h2>
//                 <p>{book.genre}</p>
//                 <p>{book.author.name}</p>
//             </div>
//         )
//     }
     
//   };

const displayBookDetails = () => {
    if (getBookHook.data) {
        let book = getBookHook.data.book
        // return console.log(book?.name)
        return (
            <div id="book-details">
                <h2>{book?.name}</h2>
                <p>Genre: {book?.genre}</p>
                <p>Written by: {book?.author.name}</p>
                <p>All books written by this author:</p>
                <ul className='other-books'>
                    {book?.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    } 
}

  return (
    <div>
      {displayBookDetails()}
    </div>
  );
};

export default BookDetails;
