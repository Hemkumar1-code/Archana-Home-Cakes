import React from 'react';
import { motion } from 'framer-motion';

const services = [
  "Birthday Cakes",
  "Wedding Cakes",
  "Anniversary Cakes",
  "Christmas Cakes",
  "New Year Cakes",
  "All Events Cakes"
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-light relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Our Services</h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-brand-cream border border-brand-dark/5 p-10 text-center shadow-luxury hover:shadow-luxury-hover transition-all duration-500 rounded-xl group cursor-pointer flex items-center justify-center transform hover:-translate-y-2"
            >
              <h3 className="text-xl md:text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors">{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
