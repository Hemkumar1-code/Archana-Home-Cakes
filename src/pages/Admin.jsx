import React, { useState, useEffect } from 'react';
import { ImagePlus, Loader2, CheckCircle, AlertCircle, Lock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const Admin = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Check Local Storage on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_ADMIN_USERNAME || 'archana';
    const validPass = import.meta.env.VITE_ADMIN_PASSWORD || 'password123';

    if (loginCreds.username === validUser && loginCreds.password === validPass) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setLoginCreds({ username: '', password: '' });
  };

  // Form State
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file); // Convert image to Base64 String
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreview || !formData.name || !formData.price || !formData.description) {
      setErrorMessage('Please fill all fields and upload an image.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      
      // 1. Upload Base64 Image to Firebase Storage
      const imageRef = ref(storage, `cakes/${Date.now()}_cake`);
      await uploadString(imageRef, imagePreview, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      // 2. Add Cake Data to Firestore
      await addDoc(collection(db, "cakes"), {
        name: formData.name,
        price: `₹${formData.price}`,
        description: formData.description,
        image_url: downloadURL,
        created_at: serverTimestamp()
      });

      setStatus('success');
      setFormData({ name: '', price: '', description: '' });
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Error adding cake to Firebase:', error);
      setErrorMessage(error.message || 'Failed to add cake. Please check your Firebase rules.');
      setStatus('error');
    }
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center font-sans px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-luxury w-full max-w-md border border-brand-gold/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-cream text-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-serif text-brand-dark mb-2">Admin Access</h1>
            <p className="text-brand-dark/50 text-sm">Please log in to manage your cakes.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Username</label>
              <input 
                type="text" 
                name="username" 
                value={loginCreds.username} 
                onChange={handleLoginChange} 
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/10 bg-brand-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Password</label>
              <input 
                type="password" 
                name="password" 
                value={loginCreds.password} 
                onChange={handleLoginChange} 
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/10 bg-brand-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{loginError}</span>
              </div>
            )}

            <button type="submit" className="w-full bg-brand-dark text-brand-gold py-4 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-luxury hover:shadow-luxury-hover">
              Sign In
            </button>
            
            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-brand-dark/40 hover:text-brand-gold transition-colors underline">
                Return to Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="min-h-screen bg-brand-cream py-12 font-sans text-brand-dark">
      <div className="container mx-auto px-6 max-w-2xl">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-gold mb-2">Admin Dashboard</h1>
            <Link to="/" className="text-brand-dark/50 hover:text-brand-gold transition-colors underline font-medium text-sm">
              Back to Website
            </Link>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-brand-dark/20 rounded-lg text-brand-dark hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-sm font-semibold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury p-8 md:p-12 border border-brand-gold/10">
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-2">Add New Cake</h2>
            <p className="text-brand-dark/50 text-sm">Upload a new cake to display on the live website showcase.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Cake Image</label>
              <label className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${imagePreview ? 'border-brand-gold bg-brand-cream/30' : 'border-brand-dark/20 hover:border-brand-gold bg-brand-light'}`}>
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="h-full object-cover rounded-lg shadow-sm" />
                    <div className="absolute inset-0 bg-brand-dark/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-brand-light text-sm font-semibold tracking-wider uppercase">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-brand-dark/50">
                    <ImagePlus size={48} strokeWidth={1} className="mb-4 text-brand-gold/70" />
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="text-xs mt-2 opacity-70">PNG, JPG perfectly formatted</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* Cake Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Cake Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter cake name" 
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/10 bg-brand-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-brand-dark/30"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Price</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="Enter price (₹)" 
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/10 bg-brand-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-brand-dark/30"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-dark">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Enter cake description" 
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/10 bg-brand-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none placeholder:text-brand-dark/30"
              />
            </div>

            {/* Messages */}
            {status === 'error' && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-lg border border-green-100">
                <CheckCircle size={20} />
                <span className="text-sm font-medium">Cake added successfully to the showcase!</span>
              </div>
            )}

            {/* Submit */}
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-brand-dark text-brand-gold py-4 rounded-lg font-bold tracking-[0.15em] uppercase text-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-luxury hover:shadow-luxury-hover mt-4"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className="animate-spin text-brand-gold" />
                  Saving...
                </>
              ) : (
                'Add Cake'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
