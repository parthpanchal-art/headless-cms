import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const imageUrl = product.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/300';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass glass-hover rounded-3xl p-4 flex flex-col h-full group bg-white/40"
    >
      <Link to={`/product/${product.slug}`} className="flex-1">
        <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square shadow-inner bg-slate-100">
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
             <span className="text-white text-sm font-semibold flex items-center gap-1">
                View Details <ArrowRight size={14} />
             </span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{product.title}</h2>
        <div 
          className="text-slate-500 text-sm mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.excerpt }} 
        />
      </Link>
      
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
        <span className="text-indigo-600 font-bold text-lg">{product.price?.replace('$', '₹') || 'Contact for Price'}</span>
        <div className="flex gap-2">
          <Link 
            to={`/product/${product.slug}`}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}