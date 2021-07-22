import { ApolloProvider } from '@apollo/client';
import ProductList from './components/ProductList';
import { client } from './apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <ProductList />
    </ApolloProvider>
  );
}

export default App;
