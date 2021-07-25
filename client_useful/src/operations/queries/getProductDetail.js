import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from '../../queries';
import { useEffect, useState } from 'react';

export const useGetProductDetail = (product, view) => {
  const [isDetailVisible, setDetailVisible] = useState(view === 'detailed');

  useEffect(() => {
    setDetailVisible(view === 'detailed');
  }, [view]);

  const [getProductDetail, { loading }] = useLazyQuery(GET_PRODUCT_DETAIL, {
    variables: { id: product.id },
  });

  return { getProductDetail, loading, isDetailVisible, setDetailVisible };
};
