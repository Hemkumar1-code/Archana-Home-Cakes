// src/components/OrderModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, cake }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hello! I would like to order:
Cake: ${cake?.name}
Quantity: ${formData.quantity}
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919688476484?text=${encodedText}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-cream rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="p-8">
            <h3 className="text-3xl font-serif text-brand-dark mb-2">Order Your Cake</h3>
            <p className="text-brand-dark/70 mb-6 font-sans">You selected: <span className="font-bold text-brand-gold">{cake?.name}</span></p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/30 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/30 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Delivery Address</label>
                <textarea required name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/30 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans resize-none"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Quantity</label>
                <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/30 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-brand-gold text-brand-dark py-3 mt-6 uppercase tracking-widest text-sm font-bold hover:bg-brand-dark hover:text-white transition-colors duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.4)]"
              >
                Order via WhatsApp
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;
