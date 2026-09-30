import React from 'react';
import categories from '../data/categories.json';
import CategoryCard from '../components/CategoryCard';

const CategoriesPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3B2C24] mb-4">Product Categories</h1>
          <p className="text-lg text-[#5C4A40]">Browse our complete range of wholesale products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#3B2C24] mb-6">Overview</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#8C6B52] mb-2">{categories.length}</p>
              <p className="text-sm uppercase tracking-wider text-[#5C4A40] font-medium">Total Categories</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[#E8E1D9]"></div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#8C6B52] mb-2">78</p>
              <p className="text-sm uppercase tracking-wider text-[#5C4A40] font-medium">Total Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
