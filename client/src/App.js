import BookList from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // cache: new InMemoryCache() //  Apollo Client uses this to cache query results after fetching them.
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
