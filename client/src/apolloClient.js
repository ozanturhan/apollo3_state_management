import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        selected: {
          read(selected) {
            return selected || false;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
  connectToDevTools: true,
});
