import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const imageUrl = product.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/300';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-shadow group">
      <Link to={`/product/${product.slug}`}>
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="w-full h-64 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" 
        />
        <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
        <div 
          className="text-gray-500 text-sm mt-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.excerpt }} 
        />
      </Link>
      <Link 
        to={`/product/${product.slug}`}
        className="block w-full text-center mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        View Item
      </Link>
    </div>
  );
}