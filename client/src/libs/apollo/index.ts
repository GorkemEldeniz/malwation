import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_APP_API_URL,
  cache: new InMemoryCache(),
});

export default client;
