import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { client } from '../../apolloClient';
import { GET_PRODUCTS } from '../../queries';

export const useGetProducts = view => {
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(GET_PRODUCTS, {
    variables: { view },
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    setLoading(true);

    client
      .query({
        query: GET_PRODUCTS,
        variables: { view },
        fetchPolicy: view === 'detailed'? 'network-only' : 'cache-first'
      })
      .then(() => setLoading(false));
  }, [view]);

  return {
    data,
    isAllSelected: data?.products.every(item=> item.selected),
    loading,
  };
};
