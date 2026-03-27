import { gql } from '@apollo/client/core/index.js';
import { useQuery } from '@apollo/client/react/index.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

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

const SLIDES = [
  {
    id: 1,
    tag: "Shiv Tech Collection 2026",
    title: <>Redefine Your <br /> <span className="text-gradient">Digital Lifestyle</span></>,
    desc: "Discover innovation and style with our most advanced product line yet. Meticulously designed for the modern world.",
    cta: "Shop the Collection",
    color: "from-white to-slate-50",
    accent: "bg-indigo-50/50",
    icon: <Sparkles size={24} className="text-indigo-500" />
  },
  {
    id: 2,
    tag: "Next-Gen Performance",
    title: <>Engineered for <br /> <span className="text-indigo-600">Excellence</span></>,
    desc: "Uncompromising quality meets cutting-edge technology. Experience the future of performance today.",
    cta: "View Innovations",
    color: "from-slate-50 to-white",
    accent: "bg-green-50/50",
    icon: <Zap size={24} className="text-green-500" />
  },
  {
    id: 3,
    tag: "Secure & Reliable",
    title: <>Powering Your <br /> <span className="text-green-600">Digital Vision</span></>,
    desc: "Built on a foundation of trust and security. Scalable solutions tailored for your unique business needs.",
    cta: "Get Started",
    color: "from-white to-indigo-50/10",
    accent: "bg-blue-50/50",
    icon: <ShieldCheck size={24} className="text-blue-500" />
  }
];

function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-[650px] mb-20 overflow-hidden rounded-[3.5rem] glass shadow-2xl border-white group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${SLIDES[current].color} p-12 md:p-24 flex items-center`}
        >
          {/* Decorative Blurs */}
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${SLIDES[current].accent} blur-[120px] rounded-full -mr-48 -mt-48`}></div>
          <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${SLIDES[current].accent} blur-[100px] rounded-full -ml-32 -mb-32`}></div>

          <div className="relative z-10 max-w-3xl pr-16 md:pr-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                {SLIDES[current].icon}
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 bg-indigo-50 px-4 py-2 rounded-full">
                {SLIDES[current].tag}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[1] text-slate-900 tracking-tighter"
            >
              {SLIDES[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl max-w-xl mb-12 leading-relaxed font-medium"
            >
              {SLIDES[current].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-indigo-900/10 flex items-center gap-3 hover:scale-105 transition-transform group/btn relative z-30">
                {SLIDES[current].cta}
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-all relative z-30">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation Arrows - Repositioned to avoid overlap */}
      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-40">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full glass border-white text-slate-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl bg-white/40 group/nav"
        >
          <ChevronLeft size={32} className="group-hover/nav:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-40">
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full glass border-white text-slate-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-xl bg-white/40 group/nav"
        >
          <ChevronRight size={32} className="group-hover/nav:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
              current === i ? 'w-16 bg-indigo-600 shadow-indigo-200' : 'w-3 bg-slate-200/80 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium tracking-wide">Synchronizing collections...</p>
    </div>
  );

  if (error) return (
    <div className="glass p-8 rounded-3xl text-center border-red-100 max-w-lg mx-auto mt-20">
      <p className="text-red-500 font-medium">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <BannerSlider />

      {/* Product List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Curated Intelligence</span>
            <h2 className="text-4xl font-black text-slate-900">Featured <span className="text-gradient">Innovations</span></h2>
          </div>
          <div className="h-px flex-1 mx-12 bg-slate-100 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hidden md:inline">Total Reach: {data?.products?.nodes?.length || 0} Products</span>
            <Link to="/cart" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.products?.nodes?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}