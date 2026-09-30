import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-brown-100 flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-brown-50">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brown-400 p-4 text-center">
            <span className="text-sm font-medium">Image unavailable</span>
          </div>
        )}
        {product.availability === 'Out of Stock' && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-600 text-xs font-bold px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {product.category && (
          <div className="mb-2">
            <span className="inline-block bg-brown-50 text-brown-600 text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        )}
        
        <Link to={`/products/${product.id}`} className="group flex-grow">
          <h3 className="text-brown-900 font-semibold text-lg line-clamp-2 leading-tight group-hover:text-brown-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-4 pt-4 border-t border-brown-100">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xl font-bold text-brown-900">
                {product.price || `₹${product.priceRaw}`}
              </span>
              {product.priceUnit && (
                <span className="text-sm text-brown-500 ml-1">
                  / {product.priceUnit}
                </span>
              )}
            </div>
            {product.moq && (
              <div className="text-xs text-brown-500 font-medium">
                MOQ: {product.moq} {product.priceUnit}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
