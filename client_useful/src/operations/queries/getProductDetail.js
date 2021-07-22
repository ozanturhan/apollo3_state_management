import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from '../../queries';

export const useGetProductDetail = product => {
  const [getProductDetail, result] = useLazyQuery(GET_PRODUCT_DETAIL, {
    variables: { id: product.id },
  });

  return [getProductDetail, result];
};
