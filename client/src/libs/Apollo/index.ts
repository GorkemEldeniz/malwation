import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiURL = import.meta.env.VITE_APP_HTTP_URI;
export const client = new ApolloClient({
  uri: apiURL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
