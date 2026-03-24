import React from 'react';
import { Phone, Mail, Award, Truck } from 'lucide-react';

const InstagramIcon = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-2xl shadow-luxury overflow-hidden p-8 md:p-16 flex flex-col md:flex-row gap-12 border border-brand-gold/10">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Get In Touch</h2>
            <div className="w-16 h-1 bg-brand-gold mb-8"></div>
            <p className="text-brand-dark/70 mb-8 font-sans leading-relaxed">
              Based in Sirumugai, we bring the finest homemade cakes right to your celebrations. Reach out for custom designs, special requests, or just to say hello.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-cream flex items-center justify-center rounded-full text-brand-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-brand-dark/50 font-semibold uppercase tracking-wider">Phone / WhatsApp</p>
                  <p className="text-brand-dark font-sans font-medium">9688476484 / 8807724484</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-cream flex items-center justify-center rounded-full text-brand-gold">
                  <InstagramIcon size={24} />
                </div>
                <div>
                  <p className="text-sm text-brand-dark/50 font-semibold uppercase tracking-wider">Instagram</p>
                  <p className="text-brand-dark font-sans font-medium">@archana_home_cakes_sirumugai</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-cream flex items-center justify-center rounded-full text-brand-gold">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-sm text-brand-dark/50 font-semibold uppercase tracking-wider">Delivery</p>
                  <p className="text-brand-dark font-sans font-medium">Free Delivery up to 5 KM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-brand-dark rounded-xl p-8 lg:p-12 text-brand-light flex flex-col justify-center text-center relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-brand-gold">
              <Award size={160} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-6 text-brand-gold">Archana Home Cakes</h3>
              <p className="font-sans font-light mb-8 text-lg">
                Sirumugai, Tamil Nadu
              </p>
              <div className="w-12 h-px bg-brand-light/20 mx-auto mb-8"></div>
              
              <div className="mb-6">
                <p className="text-xs text-brand-light/50 uppercase tracking-widest font-semibold mb-2">Certification</p>
                <div className="inline-block border border-brand-gold/50 px-4 py-2 rounded">
                  <p className="font-sans font-medium tracking-wider text-brand-gold text-sm">FSSAI Lic No: 22425402000512</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-brand-light/70 uppercase tracking-widest font-semibold mb-2">Hours</p>
                <p className="font-sans font-light">Available for orders all days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
