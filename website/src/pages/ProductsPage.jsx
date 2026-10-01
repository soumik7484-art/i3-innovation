import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  
  // Update state when URL params change
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  // Handle Search Input
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('search', val);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Handle Single Category Filter (click selected toggles off, click another switches)
  const toggleCategory = (catName) => {
    const nextCategory = selectedCategory === catName ? '' : catName;
    setSelectedCategory(nextCategory);
    setCurrentPage(1);
    
    const newParams = new URLSearchParams(searchParams);
    if (nextCategory) {
      newParams.set('category', nextCategory);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const resetCategory = () => {
    setSelectedCategory('');
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams);
  };
  
  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Single Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        const matchesSub = product.subcategory?.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        
        if (!matchesName && !matchesCategory && !matchesSub && !matchesDesc && !matchesBrand) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Sort
  const [sortOption, setSortOption] = useState('Default');
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOption === 'Price: Low to High') {
      sorted.sort((a, b) => (a.priceRaw || 0) - (b.priceRaw || 0));
    } else if (sortOption === 'Price: High to Low') {
      sorted.sort((a, b) => (b.priceRaw || 0) - (a.priceRaw || 0));
    } else if (sortOption === 'Name: A-Z') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  // Pagination
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="text-sm mb-2 text-gray-500 flex items-center">
            <Link to="/" className="hover:text-brown-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Products</span>
          </nav>
          <h1 className="text-3xl font-bold text-brown-900">
            {selectedCategory || 'All Products'}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden w-full bg-white border border-gray-300 py-2 rounded-md shadow-sm font-medium text-gray-700"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar */}
          <aside className={`w-full lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4 text-brown-800">Search</h2>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brown-500 text-sm"
              />
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-brown-800">Categories</h2>
                {selectedCategory && (
                  <button 
                    onClick={resetCategory}
                    className="text-sm text-brown-600 hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {categoriesData.map(cat => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <label
                      key={cat.name}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCategory(cat.name);
                      }}
                      className="flex items-center space-x-3 cursor-pointer group select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-gray-300 text-brown-600 focus:ring-brown-500 w-4 h-4 cursor-pointer"
                      />
                      <span className={`text-sm transition-colors ${isSelected ? 'text-brown-900 font-semibold' : 'text-gray-700 group-hover:text-brown-700'}`}>
                        {cat.name}
                      </span>
                      <span className={`text-xs ml-auto px-2 py-0.5 rounded-full ${isSelected ? 'bg-brown-100 text-brown-800 font-medium' : 'bg-gray-100 text-gray-400'}`}>
                        {cat.productCount}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            
            {/* Price Range Filter (UI only representation) */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-brown-800">Price Range</h2>
              <div className="flex items-center space-x-2">
                <input type="number" placeholder="Min" className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brown-500" />
                <span className="text-gray-400">-</span>
                <input type="number" placeholder="Max" className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brown-500" />
              </div>
              <button className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1.5 rounded-md transition-colors">Apply</button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{sortedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, sortedProducts.length)}</span> of <span className="font-semibold text-gray-900">{sortedProducts.length}</span> products
              </p>
              
              <div className="flex items-center space-x-3">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brown-500 text-sm bg-gray-50"
                >
                  <option value="Default">Default</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Name: A-Z">Name: A-Z</option>
                </select>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center border border-gray-100">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">We couldn't find anything matching your search criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategories([]); searchParams.delete('search'); searchParams.delete('category'); setSearchParams(searchParams); }}
                  className="bg-brown-600 hover:bg-brown-700 text-white px-6 py-2 rounded-md transition-colors font-medium shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 mb-8 space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm'}`}
                >
                  Previous
                </button>
                <span className="flex items-center px-4 py-2 bg-brown-50 text-brown-800 border border-brown-200 rounded-md text-sm font-medium">
                  {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
