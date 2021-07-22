import {useLazyQuery, useQuery} from '@apollo/client';
import { GET_PRODUCT_DETAIL } from '../../queries';

export const useGetProductDetail = (product, isDetailVisible) => {
  const { loading } = useQuery(GET_PRODUCT_DETAIL, {
    variables: { id: product.id },
    skip: (!isDetailVisible && !product.detail) || product.detail
  });

  return loading;
};
