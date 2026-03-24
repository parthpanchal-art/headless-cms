import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import { motion } from 'framer-motion';
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

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium">Curating your experience...</p>
    </div>
  );

  if (error) return (
    <div className="glass p-8 rounded-3xl text-center border-red-500/20 max-w-lg mx-auto mt-20">
      <p className="text-red-400 font-medium">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative py-20 mb-12 overflow-hidden rounded-[3rem] glass">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full -ml-32 -mb-32"></div>
        
        <div className="relative text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold tracking-wider uppercase mb-6"
          >
            Spring Collection 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Discover Your <span className="text-gradient">Next Style</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Experience the future of fashion with our curated selection of premium apparel and accessories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="btn-primary">Shop All Products</button>
          </motion.div>
        </div>
      </section>

      {/* Product List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured <span className="text-indigo-400">Items</span></h2>
          <div className="h-px flex-1 mx-8 bg-white/10 hidden sm:block"></div>
          <span className="text-slate-500 font-medium">Showing {data?.products?.nodes?.length || 0} products</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.products?.nodes?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}