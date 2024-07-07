import React from "react";
import * as ReactDOM from "react-dom/client";
import "./shared/ui/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./pages/search";
import PageRepo from "./pages/repository";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const token = process.env.REACT_APP_TOKEN;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <div className="w-[800px] h-full min-h-100 mx-auto pt-12 pb-10">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:owner/:name" element={<PageRepo />} />
        </Routes>
      </div>
    </ApolloProvider>
  </BrowserRouter>,
);
