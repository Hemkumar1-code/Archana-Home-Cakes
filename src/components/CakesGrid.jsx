import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import cakeRed from '../assets/cake_red.png';
import cakeChoc from '../assets/cake_choc.png';
import cakeVanilla from '../assets/cake_vanilla.png';

const initialCakes = [
  {
    id: 1,
    name: "Classic Red Velvet",
    price: "₹1,500",
    description: "Rich cocoa layers with signature cream cheese frosting and edible gold dust.",
    image: cakeRed
  },
  {
    id: 2,
    name: "Dark Chocolate Truffle",
    price: "₹1,800",
    description: "Premium Belgian chocolate ganache with a soft sponge center and gold leaf.",
    image: cakeChoc
  },
  {
    id: 3,
    name: "Floral Vanilla Bean",
    price: "₹1,200",
    description: "Madagascar vanilla layers decorated with delicate edible blooms.",
    image: cakeVanilla
  }
];

const CakesGrid = ({ onOrderClick }) => {
  const [displayCakes, setDisplayCakes] = useState(initialCakes);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const q = query(collection(db, "cakes"), orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const mappedCakes = data.map(c => ({
          ...c,
          image: c.image_url || c.image
        }));
        
        setDisplayCakes([...mappedCakes, ...initialCakes]);
      } catch (error) {
        console.error("Failed to fetch cakes from Firebase:", error);
      }
    };

    fetchCakes();
  }, []);

  return (
    <section id="showcase" className="py-32 bg-brand-cream relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-6">Signature Collection</h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {displayCakes.map((cake, index) => (
            <motion.div 
              key={cake.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
              className="bg-white rounded-none border border-brand-dark/5 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group flex flex-col"
            >
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={cake.image} 
                  alt={cake.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-brand-dark opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
              <div className="p-10 text-center flex flex-col flex-grow bg-white relative z-10 -mt-6 mx-6 mb-6 shadow-xl">
                <h3 className="text-2xl font-serif text-brand-dark mb-3 tracking-wide">{cake.name}</h3>
                <p className="text-brand-gold font-medium tracking-widest text-sm uppercase mb-6">{cake.price}</p>
                <div className="w-8 h-px bg-brand-dark/10 mx-auto mb-6"></div>
                <p className="text-brand-dark/60 font-sans font-light leading-relaxed mb-8 flex-grow">{cake.description}</p>
                <button 
                  onClick={() => onOrderClick(cake)}
                  className="w-full border border-brand-dark/20 text-brand-dark py-4 uppercase tracking-widest text-xs font-semibold hover:bg-brand-dark hover:text-brand-gold transition-colors duration-500 mt-auto"
                >
                  Request Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakesGrid;
