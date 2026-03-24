import React from 'react';
import { motion } from 'framer-motion';
import { Home, Leaf, HeartHandshake } from 'lucide-react';

const specialtiesItems = [
  { icon: Home, title: "100% Home Made", desc: "Baked with love in our home kitchen in Sirumugai, ensuring a personal touch in every layer." },
  { icon: HeartHandshake, title: "100% Fresh Cake Only", desc: "No staleness and no premixes. We bake everything strictly to order for maximum freshness." },
  { icon: Leaf, title: "100% Organic", desc: "Crafted using the finest organic ingredients, completely free from harmful chemicals or preservatives." }
];

const Specialties = () => {
  return (
    <section className="py-24 bg-brand-dark text-brand-light relative border-t border-brand-gold/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
          {specialtiesItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center p-10 border border-brand-gold/10 bg-brand-light/5 rounded-2xl hover:border-brand-gold/40 hover:bg-brand-light/10 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                <item.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif text-brand-gold mb-4 tracking-wide">{item.title}</h3>
              <p className="text-brand-light/70 font-sans font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
