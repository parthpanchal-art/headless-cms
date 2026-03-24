import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  const [added, setAdded] = useState(false);
  
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: slug },
  });

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="glass p-8 rounded-3xl text-center border-red-500/20 max-w-lg mx-auto mt-20">
      <p className="text-red-400 font-medium">{error.message}</p>
    </div>
  );
  
  const product = data?.product;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </Link>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform"></div>
          <img 
            src={product.featuredImage?.node?.sourceUrl} 
            className="relative w-full rounded-[2.5rem] glass object-cover shadow-2xl" 
            alt={product.title}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-indigo-400">{product.price}</span>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider">In Stock</span>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full"></div>

          <div 
            dangerouslySetInnerHTML={{ __html: product.content }} 
            className="prose prose-invert prose-indigo max-w-none text-slate-400 leading-relaxed" 
          />
          
          <div className="pt-6">
            <button 
              onClick={handleAddToCart}
              className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                added 
                ? 'bg-green-500 text-white shadow-green-500/20' 
                : 'btn-primary'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 size={24} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={24} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-8">
            {['Eco Friendly', 'Premium Quality', 'Fast Shipping'].map((feat) => (
              <div key={feat} className="text-center p-4 rounded-2xl glass border-white/5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{feat}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}