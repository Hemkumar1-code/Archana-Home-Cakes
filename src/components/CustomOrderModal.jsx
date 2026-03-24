// src/components/CustomOrderModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, CheckCircle2 } from 'lucide-react';

const CustomOrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    flavor: 'Chocolate Truffle',
    weight: '1 kg',
    message: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('uploading');

    let imageUrl = '';
    
    // If there's an image, upload it first
    if (imagePreview) {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imagePreview })
        });

        if (response.ok) {
          const data = await response.json();
          imageUrl = data.url;
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
          console.error('Image upload failed:', errorData.error);
          alert('Note: Image upload failed. Proceeding with WhatsApp order without the image link. You can still attach the image manually in WhatsApp.');
        }
      } catch (error) {
        console.error('Error during image upload:', error);
        alert('Note: Network error or server not configured for uploads. Proceeding with WhatsApp order without the image link.');
      }
    }

    const text = `Hello! I would like a Custom Cake:
Flavor: ${formData.flavor}
Weight: ${formData.weight}
Message on Cake: ${formData.message}
Name: ${formData.name}
Phone: ${formData.phone}${imageUrl ? `\n\nReference Image Link: ${imageUrl}\n(Please wait a moment for the image preview to load in WhatsApp)` : '\n\n*I have reference images to share in chat.*'}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919688476484?text=${encodedText}`;
    
    // Use a small delay for success state before opening WhatsApp
    setStatus('success');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      onClose();
      setStatus('idle');
      setFormData({
        name: '',
        phone: '',
        flavor: 'Chocolate Truffle',
        weight: '1 kg',
        message: '',
      });
      setImagePreview(null);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-cream rounded-xl w-full max-w-lg shadow-2xl relative my-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="p-8">
            <h3 className="text-3xl font-serif text-brand-dark mb-2">Custom Cake Order</h3>
            <p className="text-brand-dark/70 mb-6 font-sans text-sm">Design your dream cake. We'll bring it to reality.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/20 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1">Phone</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/20 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1">Flavor</label>
                  <select name="flavor" value={formData.flavor} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/20 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans">
                    <option>Chocolate Truffle</option>
                    <option>Red Velvet</option>
                    <option>Vanilla Bean</option>
                    <option>Butterscotch</option>
                    <option>Fresh Fruit</option>
                    <option>Other (Discuss on WhatsApp)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1">Weight</label>
                  <select name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-brand-dark/20 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans">
                    <option>0.5 kg</option>
                    <option>1 kg</option>
                    <option>1.5 kg</option>
                    <option>2 kg</option>
                    <option>Tiered</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Message on Cake</label>
                <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="e.g. Happy Birthday Sarah" className="w-full px-4 py-2 bg-white border border-brand-dark/20 rounded focus:outline-none focus:border-brand-gold text-brand-dark font-sans" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Reference Image (Optional)</label>
                <label className={`block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${imagePreview ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-dark/20 bg-white hover:border-brand-gold'}`}>
                  {imagePreview ? (
                    <div className="relative inline-block">
                       <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded mx-auto mb-2" />
                       <p className="text-xs text-brand-gold font-bold">Image Selected</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto text-brand-dark/50 mb-2" size={20} />
                      <span className="text-sm text-brand-dark/50">Click to upload image</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={status === 'uploading'}
                className="w-full bg-brand-gold text-brand-dark py-3 mt-6 uppercase tracking-widest text-sm font-bold hover:bg-brand-dark hover:text-white transition-colors duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
              >
                {status === 'uploading' ? (
                  <><Loader2 className="animate-spin" size={18} /> Processing...</>
                ) : status === 'success' ? (
                  <><CheckCircle2 size={18} /> Sent!</>
                ) : (
                  'Send Request via WhatsApp'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomOrderModal;

