import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($id: ID!) {
    productDetail(id: $id) {
      id
      detail {
        price
        discount
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($view: String) {
    products(view: $view) {
      view
      items {
        id
        title
        selected @client
        detail {
          price
          discount
        }
      }
    }
  }
`;
