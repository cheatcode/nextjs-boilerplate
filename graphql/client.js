import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import settings from "../settings";

const client = () =>
  new ApolloClient({
    credentials: "include",
    link: ApolloLink.from([
      new HttpLink({
        uri: settings.graphql.uri,
        credentials: "include",
      }),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
        fetchPolicy: "network-only",
      },
      query: {
        errorPolicy: "all",
        fetchPolicy: "network-only",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });

export default client();
