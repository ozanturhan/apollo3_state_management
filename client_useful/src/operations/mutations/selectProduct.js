import { cache } from '../../apolloClient';
import { gql } from '@apollo/client';

export const selectProduct = (product, selected) => {
  cache.writeFragment({
    id: cache.identify(product),
    fragment: gql`
      fragment ProductSelectFragment on Product {
        selected
      }
    `,
    data: {
      selected,
    },
  });
};
