import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {!imageError && category.thumbnail ? (
        <img 
          src={category.thumbnail} 
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-brown-600"></div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-800/40 to-transparent transition-opacity duration-300 group-hover:from-brown-900 group-hover:via-brown-900/50"></div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-white text-2xl font-bold mb-1 group-hover:text-brown-100 transition-colors drop-shadow-md">
          {category.name}
        </h3>
        {category.productCount !== undefined && (
          <p className="text-brown-100 text-sm font-medium drop-shadow-sm">
            {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
          </p>
        )}
      </div>
    </Link>
  );
}
