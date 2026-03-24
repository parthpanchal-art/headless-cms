import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import ProductCard from '../components/ProductCard';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="p-10 text-center">Loading Store...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}