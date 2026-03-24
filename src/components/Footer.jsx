import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark py-12 border-t border-brand-gold/20 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-serif text-brand-gold mb-6">Archana Home Cakes</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a href="#" className="text-brand-light/50 hover:text-brand-gold transition-colors">Home</a>
          <a href="#services" className="text-brand-light/50 hover:text-brand-gold transition-colors">Services</a>
          <a href="#showcase" className="text-brand-light/50 hover:text-brand-gold transition-colors">Collection</a>
          <a href="#about" className="text-brand-light/50 hover:text-brand-gold transition-colors">Story</a>
          <a href="#gallery" className="text-brand-light/50 hover:text-brand-gold transition-colors">Gallery</a>
          <a href="#contact" className="text-brand-light/50 hover:text-brand-gold transition-colors">Contact</a>
        </div>
        <p className="text-brand-light/30 text-sm font-sans">
          &copy; {new Date().getFullYear()} Archana Home Cakes - Sirumugai. All rights reserved. Crafted with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
