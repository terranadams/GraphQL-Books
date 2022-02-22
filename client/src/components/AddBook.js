import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS_QUERY } from "../queries/queries";




const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY); // this hook is EVERYTHING

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading Authors...</option>;
    if (error) return <option disabled>Error :(</option>;
    else {
      return data.authors.map((author) => {
        return <option key={author.id} value={author.id}>{author.name}</option>;
      });
    }
  };

  return (
    <form>
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>{displayAuthors()}</select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
