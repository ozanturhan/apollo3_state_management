import { useQuery } from '@apollo/client';
import {useEffect} from 'react';
import { GET_PRODUCTS } from '../../queries';

export const useGetProducts = view => {
  const { data, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: { view },
    notifyOnNetworkStatusChange: true,
  });

  // Refetch for detailed view once
  useEffect(() => {
    if (view === 'detailed' && data?.products?.view !== 'detailed') {
      refetch();
    }
  }, [view, data?.products]);

  return {
    data,
    isAllSelected: data?.products.items.every(item => item.selected),
    loading,
  };
};
