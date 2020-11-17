import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { RootRouter } from "./RootRouter";
import { getAccessToken, setAccessToken } from "./AccessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";

function App() {
  const uri = "http://localhost:4000";

  const httpLink = new HttpLink({
    uri: `${uri}/graphql`,
    credentials: "include",
  });

  const authMiddleware = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then((operation) => {
            const accessToken = getAccessToken();
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              complete: observer.complete.bind(observer),
              error: observer.error.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) {
            handle.unsubscribe();
          }
        };
      })
  );

  let link = ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) return false;
        try {
          const { exp } = jwtDecode<JwtPayload>(token);

          if (!exp) return false;

          return Date.now() < exp * 1000;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(`${uri}/refresh_token`, {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    authMiddleware,
    httpLink,
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri,
    link,
    credentials: "inclube",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${uri}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setAccessToken(data.accessToken);
      setLoading(false);
    });
  }, []);

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        {loading ? <div>loading...</div> : <RootRouter />}
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
