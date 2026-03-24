import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/cake_gallery_1.png';
import img2 from '../assets/cake_gallery_2.png';
import img3 from '../assets/cake_gallery_3.png';
import img4 from '../assets/cake_vanilla.png';

const images = [img1, img2, img3, img4];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-brand-dark text-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Our Gallery
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden group rounded-xl shadow-2xl ${index === 0 ? 'md:col-span-2 md:h-[500px]' : 'h-80'}`}
            >
              <img src={img} alt="Gallery item" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
