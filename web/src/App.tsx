import React from 'react';
import Main from './Main';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/react-hooks'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  })

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
