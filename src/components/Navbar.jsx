import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenCustomOrder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-brand-dark/95 backdrop-blur-md shadow-2xl py-4 border-b border-brand-gold/10' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        <a href="#" onClick={closeMobileMenu} className={`text-2xl lg:text-3xl font-serif font-bold tracking-wide transition-colors duration-500 ${scrolled || isMobileMenuOpen ? 'text-brand-gold' : 'text-brand-light'}`}>
          Archana Home Cakes
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center text-sm uppercase tracking-[0.15em]">
          <a href="#showcase" className={`transition-colors duration-300 ${scrolled ? 'text-brand-light hover:text-brand-gold' : 'text-brand-light/90 hover:text-white'}`}>Cakes</a>
          <a href="#about" className={`transition-colors duration-300 ${scrolled ? 'text-brand-light hover:text-brand-gold' : 'text-brand-light/90 hover:text-white'}`}>Story</a>
          <a href="#gallery" className={`transition-colors duration-300 ${scrolled ? 'text-brand-light hover:text-brand-gold' : 'text-brand-light/90 hover:text-white'}`}>Gallery</a>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCustomOrder}
              className={`border border-brand-gold px-8 py-3 transition-all duration-500 hover:bg-brand-gold hover:text-brand-dark ${scrolled ? 'text-brand-gold' : 'text-brand-light bg-brand-dark/30 backdrop-blur-sm'}`}
            >
              Custom Order
            </button>

            <Link 
              to="/admin" 
              className={`flex items-center justify-center p-3 rounded-full border transition-all duration-500 hover:bg-brand-gold hover:text-brand-dark ${scrolled ? 'border-brand-gold/50 text-brand-gold' : 'border-brand-light/50 text-brand-light bg-brand-dark/30 backdrop-blur-sm'}`}
              title="Admin Panel"
            >
              <ChefHat size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || isMobileMenuOpen ? 'text-brand-gold' : 'text-brand-light'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full left-0 bg-brand-dark/95 backdrop-blur-md border-b border-brand-gold/10 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 border-transparent'}`}>
        <div className="flex flex-col items-center justify-center gap-6 px-6">
          <a href="#showcase" onClick={closeMobileMenu} className="text-brand-light text-sm uppercase tracking-widest hover:text-brand-gold w-full text-center py-2 transition-colors">Cakes</a>
          <div className="w-12 h-px bg-brand-gold/20"></div>
          <a href="#about" onClick={closeMobileMenu} className="text-brand-light text-sm uppercase tracking-widest hover:text-brand-gold w-full text-center py-2 transition-colors">Story</a>
          <div className="w-12 h-px bg-brand-gold/20"></div>
          <a href="#gallery" onClick={closeMobileMenu} className="text-brand-light text-sm uppercase tracking-widest hover:text-brand-gold w-full text-center py-2 transition-colors">Gallery</a>
          <div className="w-12 h-px bg-brand-gold/20"></div>
          
          <button 
            onClick={() => {
              closeMobileMenu();
              onOpenCustomOrder();
            }}
            className="w-full max-w-xs border border-brand-gold text-brand-gold px-8 py-4 transition-all duration-500 hover:bg-brand-gold hover:text-brand-dark uppercase tracking-widest text-xs font-bold shadow-luxury"
          >
            Custom Order
          </button>
          
          <Link 
            to="/admin" 
            onClick={closeMobileMenu}
            className="w-full max-w-xs flex items-center justify-center gap-3 bg-brand-light/5 border border-brand-light/20 text-brand-light px-8 py-4 transition-all duration-500 hover:bg-brand-light hover:text-brand-dark uppercase tracking-widest text-xs font-bold"
          >
            <ChefHat size={16} /> Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
