import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
    link: "localhost:4000",
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
