import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { ROOMURL } from '../config/urls';
import { setContext } from '@apollo/client/link/context';
import BasicServices from '../services/BasicServices';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const httpLink = createHttpLink({
  uri: `${ROOMURL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await BasicServices.getBearerToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
      "Content-Type": "application/json"
    }
  }
});
// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const queryClient = new QueryClient()


export default GraphQLProvider = ({ children }) => {


  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApolloProvider>
  )
}
