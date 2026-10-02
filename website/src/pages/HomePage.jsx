import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import categories from '../data/categories.json';
import company from '../data/company.json';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import WholesaleInquiryModal from '../components/WholesaleInquiryModal';

const MAPS_URL = 'https://maps.app.goo.gl/UXS6upTKjBuj6mQS9?g_st=aw';

const HomePage = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState('whatsapp');
  const featuredProducts = products.slice(0, 8);
  const totalProducts = products.length;
  const totalCategories = categories.length;

  // Shuffle animation between person images
  const personImages = ['/person.png', '/person2.png'];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % personImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-cream">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] bg-brown-900 overflow-hidden flex items-center">
        {/* Office/Factory 16:9 Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/office-bg.jpg')" }}
        />

        {/* Existing Brown Overlay/Tint for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/90 via-brown-900/85 to-brown-900/60" />

        {/* Subtle diagonal decorative element */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="absolute h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.2" className="text-brown-300" />
            <line x1="20" y1="100" x2="120" y2="0" stroke="currentColor" strokeWidth="0.1" className="text-brown-300" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pb-24 min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          <div className="w-full lg:w-[55%]">
            <img src="/logo.png" alt="I3 Innovation Logo" className="h-12 mb-8 object-contain" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {company.name || "I3 Innovation"}
            </h1>
            <h2 className="text-lg text-brown-200 mb-2 font-medium">
              Wholesale Manufacturer & Supplier
            </h2>
            <p className="text-white/80 mb-8 max-w-xl">
              Apparel, Uniforms & Workwear — {company.location || "Kolkata, West Bengal"}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-10">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                {totalProducts} Products
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                {totalCategories} Categories
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                Made in India
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white text-brown-800 font-medium px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors text-center">
                Explore Products
              </Link>
              <button className="border border-white/30 text-white px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-center cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right side: Representative / Person Image with shuffle animation */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-end">
            <div className="relative max-w-sm sm:max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-brown-900/30">
              {personImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt="Rajib Sarkar - I3 Innovation"
                  className="w-full h-auto max-h-[480px] object-cover object-top absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: idx === activeIndex ? 1 : 0, position: idx === 0 ? 'relative' : 'absolute' }}
                />
              ))}
            </div>
            {/* Person Name Caption */}
            <div className="mt-3 max-w-sm sm:max-w-md w-full text-center bg-white/10 backdrop-blur-md border border-white/15 rounded-xl py-2 px-4 shadow-lg">
              <h3 className="text-white font-semibold text-base sm:text-lg tracking-wide">
                Rajib Sarkar
              </h3>
              <p className="text-white/70 text-xs font-medium uppercase tracking-wider mt-0.5">
                OWNER
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-900 inline-block">
              Our Product Categories
              <div className="h-0.5 w-full bg-brown-200 mt-2"></div>
            </h2>
            <p className="mt-4 text-brown-600">
              Browse {totalCategories} categories of wholesale products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/categories" className="inline-flex items-center justify-center font-medium text-brown-800 hover:text-brown-600">
              View All Categories
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-900 inline-block">
              Featured Products
              <div className="h-0.5 w-full bg-brown-200 mt-2"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center justify-center bg-brown-800 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-brown-900 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-sm rounded-xl p-8 border border-brown-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-brown-800 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">{totalProducts}+ Products</h3>
              <p className="text-brown-600">Wide range of apparel and uniforms available for wholesale.</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-8 border border-brown-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-brown-800 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Based in {company.location?.split(',')[0] || "Kolkata"}</h3>
              <p className="text-brown-600">Manufacturer and supplier from {company.location || "West Bengal, India"}.</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-8 border border-brown-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-brown-800 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">Made in India</h3>
              <p className="text-brown-600">Products manufactured in India with quality materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="bg-brown-700 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to place a wholesale order?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setInquiryMode('whatsapp'); setInquiryOpen(true); }}
              className="bg-[#25D366] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#20bd5a] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <a
              href="tel:+916290198676"
              className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </a>
            <button
              onClick={() => { setInquiryMode('mail'); setInquiryOpen(true); }}
              className="bg-white text-brown-800 font-medium px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Mail
            </button>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Location
            </a>
          </div>
        </div>
      </section>

      {/* Wholesale Inquiry Modal */}
      <WholesaleInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        mode={inquiryMode}
      />
    </div>
  );
};

export default HomePage;
