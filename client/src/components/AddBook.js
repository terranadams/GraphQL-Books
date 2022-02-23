import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_AUTHORS_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY,
} from "../queries/queries";

// On load, this component queries author data to make <options> for the <select> tag in the form
// When the form submits, a query is ran with useMutate to update the db and rerender the component with the new data

const AddBook = () => {
  const authorsHook = useQuery(GET_AUTHORS_QUERY); //const { loading, error, data } = useQuery(GET_AUTHORS_QUERY)
  const [addBook, addBookHook] = useMutation(ADD_BOOK_MUTATION); // const [addBook, { data, loading, error }] = useMutation(ADD_BOOK_MUTATION);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("6213f36b6b10e1b38c933b8e");

  const displayAuthors = () => {
    if (authorsHook.loading)
      return <option disabled>Loading Authors...</option>;
    if (authorsHook.error) return <option disabled>Error :(</option>;
    else {
      return authorsHook.data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBook({ // this function comes with the useMutation hook
      variables: { name, genre, authorId },
      refetchQueries: [{ query: GET_BOOKS_QUERY }],
    });
    console.log("Book added!! ", name, genre, authorId);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input required type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input required type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          defaultValue={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
