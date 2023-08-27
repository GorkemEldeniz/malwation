import ReactDOM from "react-dom/client";
import Router from "@router";

import { Provider } from "react-redux";
import { store } from "@libs/redux/store";

import { ApolloProvider } from "@apollo/client";
import client from "@libs/apollo";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ApolloProvider>
);
