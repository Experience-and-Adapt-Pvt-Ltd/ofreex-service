import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

const authMiddleWare = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accesstoken: Cookies.get("access_token"),
      refreshtoken: Cookies.get("refresh_token"),
    },
  });
  return forward(operation);
});

export const graphqlClient = new ApolloClient({
  link: authMiddleWare.concat(httpLink),
  cache: new InMemoryCache(),
});
