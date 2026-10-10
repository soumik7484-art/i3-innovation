import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import company from '../data/company.json';
import categories from '../data/categories.json';
import WholesaleInquiryModal from './WholesaleInquiryModal';

const MAPS_URL = 'https://maps.app.goo.gl/UXS6upTKjBuj6mQS9?g_st=aw';
const PHONE = '916290198676';
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello I3 Innovation, I have an inquiry.')}`;

const categoryDisplayNames = {
  'School Uniform': 'School Uniforms',
  'Mens T-shirts': 'Men’s T-Shirts',
  "Men's T-shirts": 'Men’s T-Shirts',
  "Men's T-shirt": 'Men’s T-Shirts',
  'Rain Coat': 'Raincoats',
  'Mens Promotional T Shirt': 'Men’s Promotional T-Shirts',
  "Men's Promotional T Shirt": 'Men’s Promotional T-Shirts',
  'Corporate Blazers': 'Corporate Blazers',
};

export default function Footer() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState('whatsapp');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-[#485320] text-emerald-100">
      {/* CTA Strip — only shown on other pages to prevent duplication on HomePage */}
      {!isHomePage && (
        <div className="bg-[#9ACD32] border-b border-[#485320]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#485320]">Ready to place a wholesale order?</h3>
            <p className="text-sm text-[#485320]/80 mt-0.5">Get in touch with our team for bulk pricing and availability.</p>
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button
              onClick={() => { setInquiryMode('whatsapp'); setInquiryOpen(true); }}
              className="px-5 py-2.5 text-sm font-medium border border-[#485320]/30 text-[#485320] rounded-lg hover:bg-[#485320] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              WhatsApp
            </button>
            <a
              href="tel:+916290198676"
              className="px-5 py-2.5 text-sm font-medium border border-[#485320]/30 text-[#485320] rounded-lg hover:bg-[#485320] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </a>
            <button
              onClick={() => { setInquiryMode('mail'); setInquiryOpen(true); }}
              className="px-5 py-2.5 text-sm font-medium bg-white text-[#485320] rounded-lg hover:bg-[#485320] hover:text-white transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Mail
            </button>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium border border-[#485320]/30 text-[#485320] rounded-lg hover:bg-[#485320] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Location
            </a>
          </div>
        </div>
      </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="I3 Innovation" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold text-white">I3 Innovation</span>
            </Link>
            <p className="mt-4 text-sm text-emerald-100/80 leading-relaxed">
              Wholesale manufacturer and supplier of apparel and uniforms based in {company.location}.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-200/90 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0 text-emerald-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{company.location}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/categories', label: 'Categories' },
                { to: '/about', label: 'About Us' },
                { to: '/photos', label: 'Photo Gallery' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-emerald-100/80 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories
                .slice(0, 6)
                .filter((cat) => cat.name !== "Men's T-shirt")
                .map((cat) => (
                  <li key={cat.name}>
                    <Link
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="text-sm text-emerald-100/80 hover:text-white transition-colors"
                    >
                      {categoryDisplayNames[cat.name] || cat.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Actions */}
          <div id="get-in-touch" className="scroll-mt-24">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a href="tel:+916290198676" className="w-full px-4 py-2.5 text-sm font-medium text-[#485320] bg-white rounded-lg hover:bg-[#9ACD32] transition-colors flex items-center justify-center gap-2 shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 text-sm font-medium text-white border border-[#9ACD32]/40 rounded-lg hover:bg-[#9ACD32] hover:text-[#485320] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                WhatsApp
              </a>
              <button
                onClick={() => { setInquiryMode('mail'); setInquiryOpen(true); }}
                className="w-full px-4 py-2.5 text-sm font-medium text-white border border-[#9ACD32]/40 rounded-lg hover:bg-[#9ACD32] hover:text-[#485320] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Mail
              </button>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 text-sm font-medium text-white border border-[#9ACD32]/40 rounded-lg hover:bg-[#9ACD32] hover:text-[#485320] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Location
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-emerald-200/70">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-emerald-200/60">
            {company.location}
          </p>
        </div>
      </div>

      {/* Wholesale Inquiry Modal */}
      <WholesaleInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        mode={inquiryMode}
      />
    </footer>
  );
}
