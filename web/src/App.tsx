import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/react-hooks'
import { RootRouter } from './RootRouter';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  })

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <RootRouter />
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
