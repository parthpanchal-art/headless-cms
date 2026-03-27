import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
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
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="glass p-8 rounded-3xl text-center border-red-100 max-w-lg mx-auto mt-20">
      <p className="text-red-500 font-medium">{error.message}</p>
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
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors group font-semibold">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </Link>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 relative group"
        >
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform"></div>
          <img 
            src={product.featuredImage?.node?.sourceUrl} 
            className="relative w-full rounded-[2.5rem] glass object-cover shadow-2xl border-white" 
            alt={product.title}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mb-4 inline-block">Premium Range</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-slate-900">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-indigo-700">{product.price?.replace('$', '₹')}</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">In Stock</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div 
            dangerouslySetInnerHTML={{ __html: product.content }} 
            className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-indigo" 
          />
          
          <div className="pt-6">
            <button 
              onClick={handleAddToCart}
              className={`w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                added 
                ? 'bg-green-600 text-white shadow-green-200 shadow-xl' 
                : 'btn-primary shadow-xl shadow-indigo-900/10'
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
            {[
              { label: 'Quality Assured', icon: <ShieldCheck size={16} /> },
              { label: 'Fast Delivery', icon: null },
              { label: 'Secure Payment', icon: null }
            ].map((feat) => (
              <div key={feat.label} className="text-center p-4 rounded-2xl glass bg-slate-50/50 border-white">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{feat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}