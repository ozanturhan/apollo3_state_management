import { useQuery } from '@apollo/client';
import { client } from '../../apolloClient';
import { GET_PRODUCTS } from '../../queries';

export const useGetProducts = view => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: { view },
    onCompleted: result => {
      if (view === 'detailed') {
        const existingCompactData = client.readQuery({
          query: GET_PRODUCTS,
          variables: { view: 'compact' },
        });

        if (!existingCompactData) {
          client.writeQuery({
            query: GET_PRODUCTS,
            variables: { view: 'compact' },
            data: result,
          });
        }
      }
    },
  });


  return {
    data,
    isAllSelected: data?.products.every(item => item.selected),
    loading,
  };
};
