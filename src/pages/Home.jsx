import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import Services from '../components/Services';
import CakesGrid from '../components/CakesGrid';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';
import CustomOrderModal from '../components/CustomOrderModal';
import WhatsAppBtn from '../components/WhatsAppBtn';

const Home = () => {
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);

  const handleOpenOrder = (cake) => {
    setSelectedCake(cake);
  };

  const handleCloseOrder = () => {
    setSelectedCake(null);
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark relative font-sans scroll-smooth overflow-x-hidden">
      <Navbar onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />
      
      <main>
        <Hero onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />
        <Specialties />
        <Services />
        <CakesGrid onOrderClick={handleOpenOrder} />
        <About />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      {selectedCake && (
        <OrderModal 
          isOpen={true} 
          onClose={handleCloseOrder} 
          cake={selectedCake} 
        />
      )}
      
      {isCustomOrderOpen && (
        <CustomOrderModal 
          isOpen={true} 
          onClose={() => setIsCustomOrderOpen(false)} 
        />
      )}

      <WhatsAppBtn />
    </div>
  );
};

export default Home;
