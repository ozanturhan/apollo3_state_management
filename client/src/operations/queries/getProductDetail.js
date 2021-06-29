import { client } from '../../apolloClient';
import { GET_PRODUCT_DETAIL } from '../../queries';

export const getProductDetail = product => {
  return client.query({
    query: GET_PRODUCT_DETAIL,
    variables: { id: product.id },
    fetchPolicy: 'network-only',
  });
};
