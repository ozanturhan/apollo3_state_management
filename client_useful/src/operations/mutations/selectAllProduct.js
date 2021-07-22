import { GET_PRODUCTS } from '../../queries';
import { client } from '../../apolloClient';

export const selectAllProduct = (selected, view) => {
  const data = client.readQuery({ query: GET_PRODUCTS, variables: { view } });

  client.writeQuery({
    query: GET_PRODUCTS,
    data: {
      products: data.products.map(order => ({ ...order, selected })),
    },
    variables: { view },
  });
};
