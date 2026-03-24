import React, { useState, useEffect } from 'react';
import { ImagePlus, Loader2, CheckCircle, AlertCircle, Lock, LogOut, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Check Local Storage on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (isAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validUser = 'archana';
    const validPass = 'archana123';

    if (loginCreds.username === validUser && loginCreds.password === validPass) {
      setIsLoggedIn(true);
      localStorage.setItem('adminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminAuth');
  };
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Cakes List State
  const [cakes, setCakes] = useState([]);
  const [fetchingCakes, setFetchingCakes] = useState(false);

  // Fetch cakes function
  const fetchCakes = async () => {
    setFetchingCakes(true);
    try {
      const q = query(collection(db, "cakes"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      const cakesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCakes(cakesData);
    } catch (error) {
      console.error("Error fetching cakes:", error);
    } finally {
      setFetchingCakes(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchCakes();
  }, [isLoggedIn]);

  const handleDeleteCake = async (cakeId) => {
    if (window.confirm("Are you sure you want to delete this cake?")) {
      try {
        await deleteDoc(doc(db, "cakes", cakeId));
        setCakes(cakes.filter(c => c.id !== cakeId));
      } catch (error) {
        console.error("Error deleting cake:", error);
        alert("Failed to delete cake.");
      }
    }
  };

  const handleClearAllCakes = async () => {
    if (window.confirm("ARE YOU SURE? THIS WILL DELETE ALL CAKES FROM THE WEBSITE! This cannot be undone.")) {
      try {
        const querySnapshot = await getDocs(collection(db, "cakes"));
        const deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(doc(db, "cakes", docSnapshot.id)));
        await Promise.all(deletePromises);
        setCakes([]);
        alert("All cakes deleted successfully. Starting fresh!");
      } catch (error) {
        console.error("Error clearing cakes:", error);
        alert("Failed to clear some cakes.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
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

      // 1. Upload to Cloudinary
      const formDataCloud = new FormData();
      formDataCloud.append('file', imagePreview);
      formDataCloud.append('upload_preset', 'ml_default');
      formDataCloud.append('cloud_name', 'drzwhaf79');

      const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/drzwhaf79/image/upload', {
        method: 'POST',
        body: formDataCloud,
      });

      if (!cloudinaryRes.ok) throw new Error('Cloudinary upload failed');
      const cloudinaryData = await cloudinaryRes.json();
      const downloadURL = cloudinaryData.secure_url;

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
      fetchCakes(); // Refresh list after adding
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
      console.error('Error adding cake:', error);
      setErrorMessage(error.message || 'Failed to add cake. Please check your network or Cloudinary settings.');
      setStatus('error');
    }
  };

  // Login View
  if (!isLoggedIn) {
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

        {/* Manage Cakes Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-luxury p-8 md:p-12 border border-brand-gold/10">
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-2">Manage Showcase</h2>
            <p className="text-brand-dark/50 text-sm mb-4">View or delete cakes currently displayed on your website.</p>
            {cakes.length > 0 && (
              <button 
                onClick={handleClearAllCakes}
                className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
              >
                Clear Live Showcase
              </button>
            )}
          </div>

          {fetchingCakes ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-brand-gold" size={32} />
            </div>
          ) : cakes.length === 0 ? (
            <div className="text-center py-12 text-brand-dark/40 border-2 border-dashed border-brand-dark/5 rounded-xl">
              No cakes found in database. Add your first cake above!
            </div>
          ) : (
            <div className="space-y-4">
              {cakes.map((cake) => (
                <div key={cake.id} className="flex items-center gap-4 p-4 bg-brand-light rounded-xl border border-brand-dark/5 group hover:border-brand-gold/30 transition-all">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img src={cake.image_url} alt={cake.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-lg text-brand-dark truncate">{cake.name}</h4>
                    <p className="text-brand-gold text-sm font-medium">{cake.price}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCake(cake.id)}
                    className="p-3 text-brand-dark/30 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Cake"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
