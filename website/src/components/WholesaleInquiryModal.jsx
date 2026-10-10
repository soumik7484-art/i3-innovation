import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import categories from '../data/categories.json';
import products from '../data/products.json';
import filters from '../data/filters.json';

const PHONE = '+916290198676';
const EMAIL = 'i3innovation21@gmail.com';

// Clean fabric list — deduplicate and normalize the real fabric data
const cleanFabrics = (() => {
  const seen = new Set();
  const result = [];
  for (const raw of filters.fabrics) {
    const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
    for (const part of parts) {
      const key = part.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(part);
      }
    }
  }
  return result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
})();

// Steps: 1=category, 2=product, 3=quantity, 4=fabric, 5=extras, 6=review
const STEPS = { CATEGORY: 1, PRODUCT: 2, QUANTITY: 3, FABRIC: 4, EXTRAS: 5, REVIEW: 6 };

export default function WholesaleInquiryModal({ isOpen, onClose, mode = 'whatsapp', prefilledCategory = '', prefilledProduct = '', prefilledProductId = '' }) {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fabric, setFabric] = useState('');
  const [customFabric, setCustomFabric] = useState('');
  const [message, setMessage] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const scrollRef = useRef(null);

  // Derived: products in selected category
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Derived: filtered products by search
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return categoryProducts;
    const q = productSearch.toLowerCase();
    return categoryProducts.filter(p => p.name.toLowerCase().includes(q));
  }, [categoryProducts, productSearch]);

  // Derived: selected product object
  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId]);

  // Derived: fabric options for the selected product
  const productFabricOptions = useMemo(() => {
    if (!selectedProduct) return [];
    const fabrics = [];
    if (selectedProduct.fabric) fabrics.push(selectedProduct.fabric);
    if (selectedProduct.material && selectedProduct.material !== selectedProduct.fabric) fabrics.push(selectedProduct.material);
    return fabrics;
  }, [selectedProduct]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      let matchedProd = null;
      if (prefilledProductId) {
        matchedProd = products.find(p => p.id === prefilledProductId);
      } else if (prefilledProduct) {
        matchedProd = products.find(p => p.name === prefilledProduct || p.id === prefilledProduct);
      }

      const cat = matchedProd ? matchedProd.category : (prefilledCategory || '');
      setSelectedCategory(cat);
      setSelectedProductId(matchedProd ? matchedProd.id : '');
      setQuantity('');
      setFabric('');
      setCustomFabric('');
      setMessage('');
      setProductSearch('');
      setErrors({});

      if (matchedProd) {
        setStep(STEPS.QUANTITY);
      } else if (cat) {
        setStep(STEPS.PRODUCT);
      } else {
        setStep(STEPS.CATEGORY);
      }
    }
  }, [isOpen, prefilledCategory, prefilledProduct, prefilledProductId]);

  // Scroll to top on step change
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [step]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const getSelectedFabric = () => {
    if (fabric === '__custom__') return customFabric.trim();
    return fabric;
  };

  const buildMessage = () => {
    const prodName = selectedProduct?.name || selectedCategory;
    const selectedFabric = getSelectedFabric();
    const imageUrl = selectedProduct?.images?.[0] || '';
    let msg = `Hello I3 Innovation,\n\nI would like to make a wholesale inquiry.\n\nCategory: ${selectedCategory}\nProduct: ${prodName}`;
    if (quantity) msg += `\nQuantity: ${quantity}`;
    if (selectedFabric) msg += `\nFabric: ${selectedFabric}`;
    if (imageUrl) msg += `\n\nProduct Image:\n${imageUrl}`;
    if (message.trim()) msg += `\n\nAdditional Requirements:\n${message.trim()}`;
    msg += `\n\nPlease share the available pricing, MOQ, availability and other relevant details.\n\nThank you.`;
    return msg;
  };

  const handleSend = () => {
    const msg = buildMessage();
    if (mode === 'whatsapp') {
      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${PHONE}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    } else if (mode === 'mail') {
      const prodName = selectedProduct?.name || selectedCategory;
      const subject = encodeURIComponent(`Wholesale Inquiry — ${prodName}`);
      const body = encodeURIComponent(msg);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }
    onClose();
  };

  // Navigation
  const goNext = () => {
    const newErrors = {};
    if (step === STEPS.CATEGORY && !selectedCategory) {
      newErrors.category = 'Please select a category.';
    }
    if (step === STEPS.PRODUCT && !selectedProductId) {
      newErrors.product = 'Please select a product.';
    }
    if (step === STEPS.QUANTITY) {
      const qNum = Number(quantity);
      if (!quantity || isNaN(qNum) || qNum < 1 || qNum > 1000000) {
        newErrors.quantity = 'Please enter a valid quantity (1 - 1,000,000).';
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(s => Math.min(s + 1, STEPS.REVIEW));
  };

  const goBack = () => {
    setErrors({});
    setStep(s => Math.max(s - 1, STEPS.CATEGORY));
  };

  // Step labels for progress indicator
  const stepLabels = ['Category', 'Product', 'Qty', 'Fabric', 'Details', 'Review'];

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brown-100 bg-brown-50/50 shrink-0">
          <div>
            <h2 id="inquiry-modal-title" className="text-lg font-semibold text-brown-900">
              Wholesale Inquiry
            </h2>
            <p className="text-sm text-brown-500 mt-0.5">
              {mode === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-brown-400 hover:text-brown-700 hover:bg-brown-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step Progress */}
        <div className="px-6 pt-4 pb-2 shrink-0">
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-brown-600' : 'bg-brown-200'}`} />
                <span className={`text-[10px] leading-tight ${i + 1 === step ? 'text-brown-800 font-semibold' : 'text-brown-400'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4">

          {/* STEP 1: Category */}
          {step === STEPS.CATEGORY && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-brown-800 mb-1">
                Select Category <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => { setSelectedCategory(cat.name); setSelectedProductId(''); setProductSearch(''); setErrors({}); }}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'border-brown-600 bg-brown-50 text-brown-900 ring-1 ring-brown-600'
                        : 'border-brown-200 hover:border-brown-400 text-brown-700 hover:bg-brown-50/50'
                    }`}
                  >
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-xs text-brown-400">{cat.productCount} products</span>
                  </button>
                ))}
              </div>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
          )}

          {/* STEP 2: Product Selection */}
          {step === STEPS.PRODUCT && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-brown-800">
                  Select Product <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-brown-400">{categoryProducts.length} products</span>
              </div>
              {categoryProducts.length > 4 && (
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full px-3 py-2.5 bg-white border border-brown-200 rounded-lg text-sm text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 transition-colors"
                />
              )}
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {filteredProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => { setSelectedProductId(prod.id); setErrors({}); }}
                    className={`w-full text-left px-3 py-3 rounded-lg border text-sm transition-all cursor-pointer flex items-center gap-3 ${
                      selectedProductId === prod.id
                        ? 'border-brown-600 bg-brown-50 ring-1 ring-brown-600'
                        : 'border-brown-200 hover:border-brown-400 hover:bg-brown-50/50'
                    }`}
                  >
                    {prod.images?.[0] && (
                      <img
                        src={prod.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-md object-cover bg-brown-100 shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-brown-800 truncate">{prod.name}</p>
                      <p className="text-xs text-brown-400 mt-0.5">
                        {prod.price ? `₹${prod.price}` : ''}{prod.priceUnit ? ` / ${prod.priceUnit}` : ''}
                        {prod.moq ? ` · MOQ: ${prod.moq}` : ''}
                      </p>
                    </div>
                    {selectedProductId === prod.id && (
                      <svg className="w-5 h-5 text-brown-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-sm text-brown-400 text-center py-4">No products match your search.</p>
                )}
              </div>
              {errors.product && <p className="text-xs text-red-500">{errors.product}</p>}
            </div>
          )}

          {/* STEP 3: Quantity */}
          {step === STEPS.QUANTITY && (
            <div className="space-y-4">
              {selectedProduct && (
                <div className="flex items-center gap-3 p-3 bg-brown-50 rounded-lg border border-brown-100">
                  {selectedProduct.images?.[0] && (
                    <img src={selectedProduct.images[0]} alt="" className="w-10 h-10 rounded-md object-cover bg-brown-100 shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-brown-800 truncate">{selectedProduct.name}</p>
                    <p className="text-xs text-brown-400">{selectedCategory}</p>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="inquiry-quantity" className="block text-sm font-medium text-brown-800 mb-1.5">
                  Quantity <span className="text-red-500">*</span>
                </label>
                {selectedProduct?.moq && (
                  <p className="text-xs text-brown-500 mb-2">Minimum Order Quantity: {selectedProduct.moq}</p>
                )}
                <input
                  id="inquiry-quantity"
                  type="number"
                  min="1"
                  max="1000000"
                  value={quantity}
                  onChange={(e) => { setQuantity(e.target.value.slice(0, 7)); setErrors({}); }}
                  placeholder="Enter quantity"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.quantity ? 'border-red-300 focus:ring-red-200' : 'border-brown-200 focus:ring-brown-300 focus:border-brown-400'
                  }`}
                />
                {errors.quantity && <p className="mt-1.5 text-xs text-red-500">{errors.quantity}</p>}
              </div>
            </div>
          )}

          {/* STEP 4: Fabric */}
          {step === STEPS.FABRIC && (
            <div className="space-y-3">
              <label htmlFor="inquiry-fabric" className="block text-sm font-medium text-brown-800 mb-1">
                Fabric Preference
              </label>
              {productFabricOptions.length > 0 && (
                <div className="space-y-1.5 mb-3">
                  <p className="text-xs text-brown-500">This product uses:</p>
                  <div className="flex flex-wrap gap-2">
                    {productFabricOptions.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => { setFabric(f); setCustomFabric(''); }}
                        className={`px-3 py-1.5 rounded-md text-xs border transition-colors cursor-pointer ${
                          fabric === f ? 'bg-brown-600 text-white border-brown-600' : 'bg-white text-brown-700 border-brown-200 hover:border-brown-400'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <select
                id="inquiry-fabric"
                value={fabric}
                onChange={(e) => { setFabric(e.target.value); if (e.target.value !== '__custom__') setCustomFabric(''); }}
                className="w-full px-4 py-3 bg-white border border-brown-200 rounded-lg text-sm text-brown-800 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="">No preference / Any</option>
                {cleanFabrics.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
                <option value="__custom__">Other (enter manually)</option>
              </select>
              {fabric === '__custom__' && (
                <input
                  type="text"
                  value={customFabric}
                  maxLength={100}
                  onChange={(e) => setCustomFabric(e.target.value)}
                  placeholder="Enter your preferred fabric…"
                  className="w-full px-4 py-3 bg-white border border-brown-200 rounded-lg text-sm text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 transition-colors"
                />
              )}
            </div>
          )}

          {/* STEP 5: Extra Details */}
          {step === STEPS.EXTRAS && (
            <div>
              <label htmlFor="inquiry-message" className="block text-sm font-medium text-brown-800 mb-1.5">
                Additional Requirements
                <span className="text-brown-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                id="inquiry-message"
                value={message}
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Sizes, colors, customization, delivery timeline, special packaging…"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-brown-200 rounded-lg text-sm text-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 transition-colors resize-none"
              />
            </div>
          )}

          {/* STEP 6: Review */}
          {step === STEPS.REVIEW && (
            <div className="space-y-4">
              <p className="text-sm text-brown-500 mb-2">Please review your inquiry before sending.</p>
              <div className="space-y-3 bg-brown-50 rounded-xl p-4 border border-brown-100">
                <div>
                  <p className="text-xs text-brown-400 uppercase tracking-wider">Category</p>
                  <p className="text-sm font-medium text-brown-800 mt-0.5">{selectedCategory}</p>
                </div>
                <hr className="border-brown-200" />
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-brown-400 uppercase tracking-wider">Product</p>
                    <p className="text-sm font-medium text-brown-800 mt-0.5 truncate">{selectedProduct?.name || '—'}</p>
                  </div>
                  {selectedProduct?.images?.[0] && (
                    <img src={selectedProduct.images[0]} alt="" className="w-10 h-10 rounded-md object-cover bg-brown-100 shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                  )}
                </div>
                <hr className="border-brown-200" />
                <div>
                  <p className="text-xs text-brown-400 uppercase tracking-wider">Quantity</p>
                  <p className="text-sm font-medium text-brown-800 mt-0.5">{quantity}</p>
                </div>
                {getSelectedFabric() && (
                  <>
                    <hr className="border-brown-200" />
                    <div>
                      <p className="text-xs text-brown-400 uppercase tracking-wider">Fabric</p>
                      <p className="text-sm font-medium text-brown-800 mt-0.5">{getSelectedFabric()}</p>
                    </div>
                  </>
                )}
                {message.trim() && (
                  <>
                    <hr className="border-brown-200" />
                    <div>
                      <p className="text-xs text-brown-400 uppercase tracking-wider">Additional Details</p>
                      <p className="text-sm text-brown-700 mt-0.5 whitespace-pre-wrap">{message.trim()}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-brown-100 bg-brown-50/30 shrink-0">
          <div className="flex gap-3">
            {step > STEPS.CATEGORY && (
              <button
                type="button"
                onClick={goBack}
                className="px-5 py-3 rounded-lg text-sm font-medium text-brown-600 border border-brown-200 hover:bg-brown-50 transition-colors cursor-pointer"
              >
                Back
              </button>
            )}
            {step < STEPS.REVIEW ? (
              <button
                type="button"
                onClick={goNext}
                className="flex-1 py-3 px-6 rounded-lg text-sm font-medium bg-brown-700 hover:bg-brown-800 text-white transition-colors cursor-pointer"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                className="flex-1 py-3 px-6 rounded-lg text-sm font-medium bg-brown-700 hover:bg-brown-800 text-white transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {mode === 'whatsapp' ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Continue to WhatsApp
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Continue to Email
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
