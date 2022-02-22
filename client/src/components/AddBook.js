import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS_QUERY } from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY); // this hook is EVERYTHING
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("No author selected");

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading Authors...</option>;
    if (error) return <option disabled>Error :(</option>;
    else {
      return data.authors.map((author) => {
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
    console.log(name, genre, authorId);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select defaultValue={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option hidden>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
