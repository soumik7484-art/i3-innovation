import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import ImageGallery from '../components/ImageGallery';

export default function ProductDetailPage() {
  const { id } = useParams();
  
  const product = productsData.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center bg-gray-50 flex items-center justify-center">
        <div>
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">The product you're looking for doesn't exist, has been removed, or is temporarily unavailable.</p>
          <Link to="/products" className="inline-block bg-brown-700 hover:bg-brown-800 text-white font-medium px-8 py-3 rounded-md shadow-sm transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Related products (same category, excluding this one)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const attributes = [
    { label: 'Brand', value: product.brand },
    { label: 'Gender', value: product.gender },
    { label: 'Color', value: product.color },
    { label: 'Material', value: product.material },
    { label: 'Fabric', value: product.fabric },
    { label: 'Pattern', value: product.pattern },
    { label: 'Fit', value: product.fit },
    { label: 'Sleeve Type', value: product.sleeveType },
    { label: 'Neck Type', value: product.neckType },
    { label: 'Occasion', value: product.occasion },
    { label: 'Age Group', value: product.ageGroup },
    { label: 'GSM', value: product.gsm },
    { label: 'Wash Care', value: product.washCare },
    { label: 'Origin', value: product.countryOfOrigin }
  ].filter(attr => attr.value);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-gray-500 flex items-center flex-wrap gap-2">
          <Link to="/" className="hover:text-brown-700 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/products" className="hover:text-brown-700 transition-colors">Products</Link>
          <span className="text-gray-400">/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brown-700 transition-colors">
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs sm:max-w-md">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="lg:w-1/2 p-6 lg:p-10 bg-white border-b lg:border-b-0 lg:border-r border-gray-100">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Right: Product Info */}
            <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col bg-gray-50/30">
              
              <div className="mb-4">
                <Link 
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="inline-block bg-brown-50 text-brown-800 border border-brown-100 text-xs px-3 py-1 rounded-full font-medium tracking-wide uppercase"
                >
                  {product.category}
                </Link>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-brown-800 tracking-tight">
                  {product.currency} {product.price}
                </span>
                {product.priceUnit && (
                  <span className="text-gray-500 text-lg">/ {product.priceUnit}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200">
                {product.availability && (
                  <span className={`text-sm px-3 py-1.5 rounded-md font-medium inline-flex items-center gap-1.5 ${
                    product.availability.toLowerCase().includes('available') || product.availability.toLowerCase().includes('stock') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {(product.availability.toLowerCase().includes('available') || product.availability.toLowerCase().includes('stock')) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    )}
                    {product.availability}
                  </span>
                )}
                
                {product.moq && (
                  <span className="text-sm px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-md font-medium">
                    MOQ: <span className="font-bold">{product.moq}</span>
                  </span>
                )}
              </div>

              {product.description && (
                <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                  <p className="leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Attributes Pills */}
              {attributes.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Key Details</h3>
                  <div className="flex flex-wrap gap-2">
                    {attributes.map(attr => (
                      <div key={attr.label} className="bg-white border border-gray-200 shadow-sm rounded-md px-3 py-2 text-sm flex gap-2">
                        <span className="text-gray-500">{attr.label}:</span>
                        <span className="text-gray-900 font-medium">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-brown-700 hover:bg-brown-800 text-white font-medium py-3.5 px-4 rounded-md shadow-sm transition-all text-center">
                    Contact for Pricing
                  </button>
                  <button className="flex-1 bg-[#25D366]/90 hover:bg-[#25D366] text-white font-medium py-3.5 px-4 rounded-md shadow-sm transition-all text-center flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </button>
                  <button className="flex-1 bg-white border-2 border-brown-700 text-brown-800 hover:bg-brown-50 font-medium py-3 px-4 rounded-md transition-colors text-center">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Specifications */}
          {(product.specifications && Object.keys(product.specifications).length > 0) ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-brown-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Specifications
              </h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 w-1/3 border-r border-gray-200">{key}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : <div></div>}

          {/* Additional Information */}
          {((product.additionalInfo && Object.keys(product.additionalInfo).length > 0) || product.brochureUrl) ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-brown-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information
              </h2>
              
              {product.additionalInfo && Object.keys(product.additionalInfo).length > 0 && (
                <div className="space-y-5 mb-8">
                  {Object.entries(product.additionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-900 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {product.brochureUrl && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a 
                    href={product.brochureUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-brown-50 text-brown-700 hover:bg-brown-100 hover:text-brown-800 font-medium px-6 py-3 rounded-md transition-colors border border-brown-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Download Product Brochure
                  </a>
                </div>
              )}
            </div>
          ) : <div></div>}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Similar Products</h2>
                <p className="text-gray-500 text-sm">More items you might like from {product.category}</p>
              </div>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hidden sm:inline-flex items-center text-brown-700 hover:text-brown-900 font-medium">
                View all &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="block group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
                    <img 
                      src={p.images?.[0] || 'https://placehold.co/400x500/e2e8f0/64748b?text=No+Image'} 
                      alt={p.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {p.availability && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-800 uppercase tracking-wider">
                        {p.availability.split(' ')[0]}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-brown-600 font-bold uppercase tracking-wider mb-1 truncate">{p.category}</p>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-brown-700 transition-colors h-10">{p.name}</h3>
                    <div className="font-bold text-gray-900">{p.currency} {p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center sm:hidden">
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium text-sm">
                View all in {product.category}
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
