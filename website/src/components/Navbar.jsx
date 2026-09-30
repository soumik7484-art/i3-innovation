import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/photos', label: 'Photos' },
  { to: '/videos', label: 'Videos' },
  { to: '/reviews', label: 'Reviews' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brown-100'
          : 'bg-white border-b border-brown-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/logo.png"
              alt="I3 Innovation"
              className="h-10 w-10 lg:h-11 lg:w-11 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-lg lg:text-xl font-bold text-brown-900 tracking-tight">
                I3 Innovation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-brown-800 bg-brown-50'
                    : 'text-brown-600 hover:text-brown-800 hover:bg-brown-50/60'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-brown-500 hover:text-brown-700 hover:bg-brown-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Contact Button */}
            <button className="px-4 py-2 text-sm font-medium text-brown-700 border border-brown-200 rounded-lg hover:bg-brown-50 transition-colors">
              Contact
            </button>
          </div>

          {/* Mobile: Search + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-brown-500 hover:text-brown-700 rounded-lg"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brown-600 hover:text-brown-800 rounded-lg"
              aria-label="Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {showSearch && (
          <div className="pb-3 border-t border-brown-100 pt-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 px-4 py-2.5 bg-brown-50/60 border border-brown-200 rounded-lg text-sm text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-brown-700 text-white text-sm font-medium rounded-lg hover:bg-brown-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-brown-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === to
                    ? 'text-brown-800 bg-brown-50'
                    : 'text-brown-600 hover:text-brown-800 hover:bg-brown-50/60'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-brown-100 flex flex-col gap-2">
              <button className="w-full px-4 py-3 text-base font-medium text-brown-700 border border-brown-200 rounded-lg hover:bg-brown-50 transition-colors">
                Contact
              </button>
              <button className="w-full px-4 py-3 text-base font-medium text-white bg-brown-700 rounded-lg hover:bg-brown-800 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.55-.764-6.326-2.057l-.163-.124-3.377 1.131 1.131-3.377-.124-.163A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
