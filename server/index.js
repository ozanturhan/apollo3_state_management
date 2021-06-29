const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Product {
        id: ID!
        title: String
        detail: ProductDetail
    }

    type ProductDetail {
        price: String
        discount: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        products(view: String): [Product]
        productDetail(id: ID): Product
    }
`;

const products = [
    {
        id: 1,
        title: 'Iphone 5',
        detail: null
    },
    {
        id: 2,
        title: 'Iphone 6',
        detail: null
    },
    {
        id: 3,
        title: 'Iphone 7',
        detail: null
    },
];


const productDetails = {
    product_1: {
        price: '100',
        discount: '50'
    },
    product_2: {
        price: '200',
        discount: '70'
    },
    product_3: {
        price: '350',
        discount: '25'
    },
}

const resolvers = {
    Query: {
        products: async (_, { view }) => {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (view === 'compact') {
                return products;
            }

            return products.map(product => ({...product, detail: productDetails[`product_${product.id}`]}))
        },
        productDetail: async (_, { id }) => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const product = products.find(product => product.id === +id);
            console.log({product});
            return {...product, detail: productDetails[`product_${id}`]}
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});