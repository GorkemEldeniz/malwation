import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@libs/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@libs/Redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "@libs/Apollo";
import Router from "@router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <ToastContainer />
          <Router />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
