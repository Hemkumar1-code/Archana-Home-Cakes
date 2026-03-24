import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero_cake.png';

const Hero = ({ onOpenCustomOrder }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src={heroImage} 
          alt="Luxury Cake" 
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/20 to-brand-dark/95"></div>
      </div>

      <div className="relative z-10 text-center px-6 container mx-auto flex flex-col items-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif text-brand-gold mb-6 drop-shadow-2xl font-normal tracking-wide leading-tight">
            Archana Home Cakes
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-brand-light mb-4 drop-shadow-xl font-light italic">
            Sirumugai
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <p className="text-lg md:text-xl text-brand-cream/90 font-sans font-light max-w-2xl mx-auto mb-12 tracking-widest leading-relaxed mt-4 uppercase">
            100% Homemade • Fresh • Organic Cakes
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a 
            href="#showcase"
            className="inline-block border border-brand-gold bg-brand-gold text-brand-dark px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-transparent hover:text-brand-gold transition-all duration-500 shadow-luxury hover:shadow-luxury-hover font-bold"
          >
            Order Now
          </a>
          <button 
            onClick={onOpenCustomOrder}
            className="inline-block border border-brand-gold bg-brand-dark/60 backdrop-blur-sm text-brand-gold px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 shadow-luxury hover:shadow-luxury-hover font-bold"
          >
            Custom Cake Order
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
