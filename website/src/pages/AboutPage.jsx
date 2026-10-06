import React from 'react';
import company from '../data/company.json';
import categories from '../data/categories.json';
import products from '../data/products.json';

const AboutPage = () => {

  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#3B2C24] mb-4">About {company.name}</h1>
          <div className="w-24 h-1 bg-[#8C6B52] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Section 1: Intro */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 flex items-center justify-center bg-[#FDFBF7] rounded-full border border-[#E8E1D9] p-6">
              <img src="/logo.png" alt={`${company.name} Logo`} className="w-full h-auto object-contain" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#3B2C24] mb-4">{company.name}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#5C4A40] text-lg">
                <svg className="w-6 h-6 text-[#8C6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{company.location}</span>
              </div>
            </div>
          </section>

          {/* Section: Director / Leadership */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <h3 className="text-2xl font-bold text-[#3B2C24] mb-8 text-center">Meet Our Director</h3>
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-[#E8E1D9] bg-[#FAF7F2]">
                <img
                  src="/person2.png"
                  alt="Rajib Sarkar - Director"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-5">
                <h4 className="text-2xl font-bold text-[#3B2C24] tracking-tight">Rajib Sarkar</h4>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#8C6B52] mt-1">
                  Director
                </p>
                <p className="text-sm text-[#5C4A40] mt-3 leading-relaxed">
                  Leading I3 Innovation with a vision of premium craftsmanship, certified quality standards, and trusted manufacturing excellence in apparel and uniforms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Offerings */}
          <section>
            <h3 className="text-2xl font-bold text-[#3B2C24] mb-8 text-center">What We Offer</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <div key={category.name} className="bg-white px-6 py-3 rounded-full border border-[#E8E1D9] shadow-sm text-[#5C4A40] font-medium">
                  {category.name}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Our Achievement */}
          <section>
            <h3 className="text-2xl font-bold text-[#3B2C24] mb-8 text-center">Our Achievement</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-6 md:p-8 max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8E1D9] text-[#8C6B52] text-xs font-semibold uppercase tracking-wider mb-4">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ISO 9001 : 2015 Certified
              </div>
              <h4 className="text-xl font-bold text-[#3B2C24] mb-2">Quality Management System Certification</h4>
              <p className="text-[#5C4A40] text-sm max-w-lg mx-auto mb-6">
                Independently assessed by QRA and compliant with ISO 9001 : 2015 for Wholesale and Retail Readymade Garments.
              </p>
              <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-[#E8E1D9] shadow-md bg-[#FAF7F2]">
                <a href="/certificate.png" target="_blank" rel="noopener noreferrer" className="block group">
                  <img
                    src="/certificate.png"
                    alt="I3 Innovation ISO 9001:2015 Certificate of Registration"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </a>
              </div>
              <p className="text-xs text-[#8C6B52] mt-3">Click certificate to view full resolution</p>
            </div>
          </section>

          {/* Section 3: Numbers */}
          <section>
            <h3 className="text-2xl font-bold text-[#3B2C24] mb-8 text-center">Our Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-4xl font-bold text-[#8C6B52] mb-2">{products.length}</p>
                <p className="text-sm uppercase tracking-wider text-[#5C4A40] font-medium">Products</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-4xl font-bold text-[#8C6B52] mb-2">{categories.length}</p>
                <p className="text-sm uppercase tracking-wider text-[#5C4A40] font-medium">Categories</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-4xl font-bold text-[#8C6B52] mb-2">
                  590
                </p>
                <p className="text-sm uppercase tracking-wider text-[#5C4A40] font-medium">Product Images</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
