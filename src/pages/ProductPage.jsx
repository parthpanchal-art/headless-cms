import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import { useCart } from '../context/CartContext';

const GET_PRODUCT_DETAILS = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      databaseId
      title
      content
      price
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: slug },
  });

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error) return <div className="p-20 text-red-500 text-center">{error.message}</div>;
  
  const product = data?.product;

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
      <img src={product.featuredImage?.node?.sourceUrl} className="w-full md:w-1/2 rounded-xl object-cover" />
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-white-900">{product.title}</h1>
        <p className="text-2xl text-green-600 font-bold my-4">{product.price}</p>
        <div dangerouslySetInnerHTML={{ __html: product.content }} className="prose prose-slate mb-8" />
        
        <button 
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}