import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/cake_gallery_1.png';

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <img src={aboutImg} alt="Baking Process" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-4 border-brand-gold/30 m-4 rounded-xl"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">The Art of Baking</h2>
            <div className="w-16 h-1 bg-brand-gold mb-8"></div>
            <p className="text-lg text-brand-dark/80 mb-6 font-light leading-relaxed">
              Every creation at Luxury Bakes begins with a simple philosophy: uncompromising quality meets artistic vision. We don't just bake cakes; we craft edible masterpieces that become the centerpiece of your most cherished memories.
            </p>
            <p className="text-lg text-brand-dark/80 mb-8 font-light leading-relaxed">
              From hand-selected Madagascar vanilla beans to the finest single-origin Belgian chocolate, our ingredient sourcing is as meticulous as our piping. Our passion for perfection ensures that every bite is as breathtaking as the first glance.
            </p>
            <p className="text-2xl font-serif text-brand-gold italic">
              "Baking is love made visible."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
