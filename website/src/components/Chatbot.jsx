import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import companyData from '../data/company.json';
import filtersData from '../data/filters.json';
import WholesaleInquiryModal from './WholesaleInquiryModal';

const PHONE = '+916290198676';
const EMAIL = 'i3innovation21@gmail.com';
const FULL_ADDRESS = 'i3 Innovation, 156/37 B.T. Road, Opposite DORE MI APPARTMENTS, Northern Park Rd, near Geetanjali Apartment, Dunlop, Kolkata, West Bengal 700108';

const STOP_WORDS = new Set([
  'how', 'what', 'where', 'when', 'who', 'why', 'which', 'whose', 'whom',
  'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had', 'having',
  'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might', 'must',
  'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'else', 'for', 'of',
  'in', 'on', 'at', 'to', 'from', 'by', 'about', 'as', 'into', 'like',
  'through', 'after', 'over', 'between', 'out', 'against', 'during', 'without',
  'before', 'under', 'around', 'among', 'you', 'your', 'yours', 'me', 'my',
  'mine', 'we', 'our', 'ours', 'us', 'they', 'them', 'their', 'theirs',
  'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'this', 'that',
  'these', 'those', 'there', 'here', 'tell', 'show', 'give', 'need', 'want',
  'please', 'thanks', 'thank', 'good', 'any', 'some', 'many', 'much', 'more',
  'most', 'such', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
  'now', 'also'
]);

function toCompact(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getStems(word) {
  const list = [word];
  if (word.endsWith('ies')) list.push(word.slice(0, -3) + 'y');
  if (word.endsWith('es')) list.push(word.slice(0, -2));
  if (word.endsWith('s') && !word.endsWith('ss')) list.push(word.slice(0, -1));
  return list;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! Welcome to I3 Innovation.\nHow can I help you today?",
      options: [
        { label: '🔍 Find Products', action: 'find_products' },
        { label: '📁 Browse Categories', action: 'browse_categories' },
        { label: '📋 Wholesale Inquiry', action: 'inquiry' },
        { label: '💬 Ask a Question', action: 'ask_question' },
      ],
    },
  ]);

  // Wholesale Inquiry Modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPrefilledCategory, setInquiryPrefilledCategory] = useState('');
  const [inquiryPrefilledProduct, setInquiryPrefilledProduct] = useState('');
  const [inquiryPrefilledProductId, setInquiryPrefilledProductId] = useState('');
  const [inquiryMode, setInquiryMode] = useState('whatsapp');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleOpenInquiry = (category = '', productName = '', productId = '', mode = 'whatsapp') => {
    setInquiryPrefilledCategory(category);
    setInquiryPrefilledProduct(productName);
    setInquiryPrefilledProductId(productId);
    setInquiryMode(mode);
    setInquiryModalOpen(true);
  };

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4), ...msg }]);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: "Hello! Welcome to I3 Innovation.\nHow can I help you today?",
        options: [
          { label: '🔍 Find Products', action: 'find_products' },
          { label: '📁 Browse Categories', action: 'browse_categories' },
          { label: '📋 Wholesale Inquiry', action: 'inquiry' },
          { label: '💬 Ask a Question', action: 'ask_question' },
        ],
      },
    ]);
  };

  const handleAction = (action, payload) => {
    if (action === 'find_products') {
      addMessage({
        sender: 'user',
        text: 'Find Products',
      });
      setTimeout(() => {
        addMessage({
          sender: 'bot',
          text: 'What type of apparel or uniform are you looking for? You can search by garment type, school uniform, blazers, fabric, or keyword.',
          quickPills: [
            'School Uniform',
            'T-Shirts',
            'Rain Coat',
            'Corporate Blazers',
            'Track Pants',
            'Sweaters',
          ],
        });
      }, 300);
    } else if (action === 'browse_categories') {
      addMessage({
        sender: 'user',
        text: 'Browse Categories',
      });
      setTimeout(() => {
        addMessage({
          sender: 'bot',
          text: `We offer ${categoriesData.length} wholesale product categories. Select one to view available items:`,
          categoriesList: categoriesData,
        });
      }, 300);
    } else if (action === 'inquiry') {
      addMessage({
        sender: 'user',
        text: 'Wholesale Inquiry / Contact Us',
      });
      setTimeout(() => {
        addMessage({
          sender: 'bot',
          text: 'You can start a wholesale inquiry or get in touch directly with our team:',
          inquiryAction: true,
        });
      }, 300);
    } else if (action === 'ask_question') {
      addMessage({
        sender: 'user',
        text: 'Ask a Question',
      });
      setTimeout(() => {
        addMessage({
          sender: 'bot',
          text: 'Ask me anything about our products, manufacturing, fabric materials, MOQ, or wholesale ordering in Kolkata.',
          quickPills: [
            'Where are you located?',
            'What products do you manufacture?',
            'What is the price range?',
            'What is your contact number?',
          ],
        });
      }, 300);
    } else if (action === 'select_category') {
      const catName = payload;
      addMessage({
        sender: 'user',
        text: `Category: ${catName}`,
      });
      setTimeout(() => {
        const catProds = productsData.filter(
          (p) => p.category.toLowerCase() === catName.toLowerCase()
        );
        if (catProds.length > 0) {
          addMessage({
            sender: 'bot',
            text: `Found ${catProds.length} products in "${catName}":`,
            productsList: catProds.slice(0, 4),
            totalMatching: catProds.length,
            categoryName: catName,
          });
        } else {
          addMessage({
            sender: 'bot',
            text: `No products currently found in ${catName}.`,
          });
        }
      }, 300);
    } else if (action === 'quick_search') {
      handleUserQuery(payload);
    }
  };

  // Natural Language & Search Engine strictly referencing real data
  const handleUserQuery = (queryText) => {
    const q = queryText.trim();
    if (!q) return;

    addMessage({
      sender: 'user',
      text: q,
    });
    setInputQuery('');

    const lower = q.toLowerCase();

    setTimeout(() => {
      // 1. Greetings
      if (/^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening)|hola)\b/i.test(lower)) {
        addMessage({
          sender: 'bot',
          text: "Hello! Welcome to I3 Innovation. I'm your assistant for apparel, uniforms, and bulk wholesale inquiries. How can I assist you?",
          options: [
            { label: '🔍 Find Products', action: 'find_products' },
            { label: '📁 Browse Categories', action: 'browse_categories' },
            { label: '📋 Wholesale Inquiry', action: 'inquiry' },
          ],
        });
        return;
      }

      // 2. Company / Location questions
      if (
        /where.*(located|address|city|state|factory|office|shop|based)|location|address|dunlop|bt road|kolkata|west bengal/i.test(lower)
      ) {
        addMessage({
          sender: 'bot',
          text: FULL_ADDRESS,
          contactButtons: true,
        });
        return;
      }

      // 3. Contact / WhatsApp / Phone / Email
      if (
        /contact|phone|call|whatsapp|email|mail|number|reach|mobile|talk/i.test(lower)
      ) {
        addMessage({
          sender: 'bot',
          text: `You can reach I3 Innovation directly:\n• WhatsApp / Call: ${PHONE}\n• Email: ${EMAIL}\n• Address: ${FULL_ADDRESS}`,
          contactButtons: true,
        });
        return;
      }

      // 4. Products overview / What do you sell / Categories
      if (
        /(what.*(sell|make|manufacture|offer|products|produce)|catalog|items|all categories)/i.test(lower) &&
        !/t-?shirt|uniform|blazer|pant|coat|sock|frock/i.test(lower)
      ) {
        addMessage({
          sender: 'bot',
          text: `I3 Innovation offers ${companyData.totalProducts} wholesale products across ${companyData.totalCategories} categories including School Uniforms, T-Shirts, Rain Coats, Corporate Blazers, Track Pants, Sweaters, and Cricket Wear.`,
          categoriesList: categoriesData,
        });
        return;
      }

      // 5. Price range
      if (/price range|pricing|rates|how much.*(cost|all)|minimum price|maximum price/i.test(lower)) {
        addMessage({
          sender: 'bot',
          text: `Our wholesale products range from ₹${filtersData.priceMin || 30} to ₹${filtersData.priceMax || 950} per piece depending on the garment, fabric, and volume. For customized bulk orders, please request a wholesale quote.`,
          options: [
            { label: '🔍 Find Products', action: 'find_products' },
            { label: '📋 Wholesale Inquiry', action: 'inquiry' },
          ],
        });
        return;
      }

      // 6. MOQ / Minimum order
      if (/moq|minimum order|minimum quantity|smallest order/i.test(lower)) {
        addMessage({
          sender: 'bot',
          text: "Minimum Order Quantities (MOQ) vary per product (typically from 100 to 500 pieces for school uniforms and bulk t-shirts). You can check the specific MOQ on each product card or submit an inquiry for custom quantities.",
          options: [
            { label: '📁 Browse Categories', action: 'browse_categories' },
            { label: '📋 Wholesale Inquiry', action: 'inquiry' },
          ],
        });
        return;
      }

      // 7. Tokenize and filter stop words
      const rawTokens = lower.replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(Boolean);
      const queryTokens = rawTokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t));

      // If user typed only stop words or no meaningful terms
      if (queryTokens.length === 0) {
        addMessage({
          sender: 'bot',
          text: "Sorry, I couldn't find confirmed information about that in the available I3 Innovation dataset. Please contact our team directly for assistance.",
          contactButtons: true,
        });
        return;
      }

      // 8. Search real product dataset with substring and compound word matching
      const compactQuery = toCompact(lower);
      const compactQueryStems = getStems(compactQuery);

      const allTokens = [];
      for (const t of queryTokens) {
        allTokens.push(...getStems(t));
      }
      const uniqueTokens = [...new Set(allTokens)];

      const scoredProducts = productsData
        .map((p) => {
          let score = 0;
          const pName = (p.name || '').toLowerCase();
          const pCat = (p.category || '').toLowerCase();
          const pSub = (p.subcategory || '').toLowerCase();
          const pFabric = (p.fabric || '').toLowerCase();
          const pMat = (p.material || '').toLowerCase();

          const pNameCompact = toCompact(pName);
          const pCatCompact = toCompact(pCat);

          // 1. Direct compact query matches (handles 'trackpants' matching 'Men Track Pants')
          for (const qStem of compactQueryStems) {
            if (qStem.length >= 4) {
              if (pNameCompact.includes(qStem)) score += 35;
              if (pCatCompact.includes(qStem)) score += 25;
            }
          }

          // 2. Exact full phrase matches
          if (pName.includes(lower)) score += 30;
          if (pCat.includes(lower)) score += 20;

          // 3. Token matches & 5-6 character partial string matching
          for (const token of uniqueTokens) {
            const wordRegex = new RegExp('(?:^|\\s|[-,/])' + token.replace('-', '[- ]?') + '(?:$|\\s|[-,/])', 'i');
            if (wordRegex.test(pName)) score += 15;
            else if (pName.includes(token) && token.length >= 3) score += 8;

            if (wordRegex.test(pCat)) score += 12;
            if (wordRegex.test(pSub)) score += 8;
            if (wordRegex.test(pFabric) || wordRegex.test(pMat)) score += 8;

            // 4. Substring of 5-6+ characters in compact product name or category
            const tokenCompact = toCompact(token);
            if (tokenCompact.length >= 5) {
              if (pNameCompact.includes(tokenCompact)) score += 20;
              if (pCatCompact.includes(tokenCompact)) score += 15;
            }
          }

          return { product: p, score };
        })
        .filter((item) => item.score >= 8)
        .sort((a, b) => b.score - a.score);

      if (scoredProducts.length > 0) {
        const topProducts = scoredProducts.slice(0, 4).map((i) => i.product);
        addMessage({
          sender: 'bot',
          text: `I found ${scoredProducts.length} matching product${scoredProducts.length > 1 ? 's' : ''} in our dataset for "${q}":`,
          productsList: topProducts,
          totalMatching: scoredProducts.length,
          searchQuery: q,
        });
        return;
      }

      // Check if query matches a category name
      const matchedCategory = categoriesData.find((c) => {
        const cLow = c.name.toLowerCase();
        if (cLow === lower || lower.includes(cLow)) return true;
        return queryTokens.some((t) => {
          if (t === 'tshirt' || t === 't-shirt' || t === 'tshirts') return cLow.includes('t-shirt') || cLow.includes('t shirts');
          if (t === 'raincoat' || t === 'raincoats') return cLow.includes('rain coat');
          if (t === 'blazer' || t === 'blazers') return cLow.includes('blazer');
          if (t === 'pant' || t === 'pants') return cLow.includes('pant');
          if (t === 'sweater' || t === 'sweaters') return cLow.includes('sweater');
          if (t === 'uniform' || t === 'uniforms') return cLow.includes('uniform');
          if (t === 'cricket') return cLow.includes('cricket');
          return cLow.split(/\s+/).some((cw) => cw === t);
        });
      });

      if (matchedCategory) {
        const catProds = productsData.filter(
          (p) => p.category.toLowerCase() === matchedCategory.name.toLowerCase()
        );
        addMessage({
          sender: 'bot',
          text: `Here are real products in "${matchedCategory.name}" (${catProds.length} total available):`,
          productsList: catProds.slice(0, 4),
          totalMatching: catProds.length,
          categoryName: matchedCategory.name,
        });
        return;
      }

      // 9. Fabric query check
      const matchedFabric = filtersData.fabrics.find((f) =>
        lower.includes(f.toLowerCase())
      );
      if (matchedFabric) {
        const fabricProds = productsData.filter(
          (p) =>
            (p.fabric && p.fabric.toLowerCase().includes(matchedFabric.toLowerCase())) ||
            (p.material && p.material.toLowerCase().includes(matchedFabric.toLowerCase()))
        );
        if (fabricProds.length > 0) {
          addMessage({
            sender: 'bot',
            text: `Yes, we manufacture apparel using "${matchedFabric}". Here are matching items:`,
            productsList: fabricProds.slice(0, 4),
            totalMatching: fabricProds.length,
          });
          return;
        }
      }

      // 10. Strict Knowledge Boundary Fallback
      addMessage({
        sender: 'bot',
        text: "Sorry, I couldn't find confirmed information about that in the available I3 Innovation dataset. Please contact our team directly for assistance.",
        contactButtons: true,
      });
    }, 350);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      handleUserQuery(inputQuery);
    }
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close I3 Assistant' : 'Open I3 Assistant'}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brown-900 text-white shadow-xl hover:bg-brown-800 transition-all duration-200 border-2 border-brown-700/60 focus:outline-none focus:ring-4 focus:ring-brown-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              {/* Chat icon */}
              <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {/* Status pulse */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-brown-900"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="I3 Assistant Chat"
          className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] h-[520px] max-h-[calc(100vh-7.5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-brown-200/80 overflow-hidden transition-all duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brown-900 to-brown-800 text-white px-4 py-3.5 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brown-700/80 border border-brown-500/50 flex items-center justify-center font-bold text-sm tracking-wider text-brown-100 shrink-0">
                I3
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm leading-tight text-white">I3 Assistant</h3>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[11px] text-brown-200 leading-tight">Product & Wholesale Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset button */}
              <button
                onClick={handleResetChat}
                title="Restart chat"
                aria-label="Restart chat"
                className="p-1.5 text-brown-300 hover:text-white hover:bg-brown-700/60 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-1.5 text-brown-300 hover:text-white hover:bg-brown-700/60 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#FAF7F2]/50 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-brown-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-brown-900 border border-brown-100 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Primary Options (e.g. on Welcome) */}
                {m.options && (
                  <div className="mt-2.5 w-full grid grid-cols-1 gap-1.5">
                    {m.options.map((opt) => (
                      <button
                        key={opt.action}
                        onClick={() => handleAction(opt.action)}
                        className="text-left px-3 py-2 bg-white hover:bg-brown-50 border border-brown-200 text-brown-800 text-xs font-medium rounded-lg transition-colors shadow-2xs flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt.label}</span>
                        <svg className="w-3.5 h-3.5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Query Pills */}
                {m.quickPills && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                    {m.quickPills.map((pill) => (
                      <button
                        key={pill}
                        onClick={() => handleAction('quick_search', pill)}
                        className="px-2.5 py-1 bg-white hover:bg-brown-50 border border-brown-200 text-brown-700 text-xs rounded-full transition-colors cursor-pointer"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                )}

                {/* Categories List Display */}
                {m.categoriesList && (
                  <div className="mt-2.5 w-full grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                    {m.categoriesList.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleAction('select_category', cat.name)}
                        className="text-left px-3 py-2 bg-white hover:bg-brown-50 border border-brown-200 text-brown-800 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-medium truncate">{cat.name}</span>
                        <span className="text-[10px] text-brown-400 bg-brown-50 px-1.5 py-0.5 rounded-sm shrink-0 ml-2">
                          {cat.productCount} items
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Products List Display */}
                {m.productsList && (
                  <div className="mt-2.5 w-full space-y-2">
                    {m.productsList.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white border border-brown-200 rounded-xl p-2.5 shadow-2xs flex gap-2.5 items-center"
                      >
                        {prod.images?.[0] ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover bg-brown-100 shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-brown-100 flex items-center justify-center text-brown-400 text-[10px] shrink-0">
                            No Img
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-brown-900 truncate">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-brown-500">
                            {prod.price ? `₹${prod.price}` : ''}
                            {prod.priceUnit ? ` / ${prod.priceUnit}` : ''}
                            {prod.moq ? ` · MOQ: ${prod.moq}` : ''}
                          </p>
                          <div className="flex gap-1.5 mt-1.5">
                            <Link
                              to={`/products/${prod.id}`}
                              onClick={() => setIsOpen(false)}
                              className="px-2 py-0.5 bg-brown-50 hover:bg-brown-100 text-brown-800 text-[10px] font-medium rounded-md border border-brown-200 transition-colors"
                            >
                              View Product
                            </Link>
                            <button
                              onClick={() => handleOpenInquiry(prod.category, prod.name, prod.id, 'whatsapp')}
                              className="px-2 py-0.5 bg-brown-700 hover:bg-brown-800 text-white text-[10px] font-medium rounded-md transition-colors cursor-pointer"
                            >
                              Inquiry
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* View full category or catalog link if more results */}
                    {m.categoryName && (
                      <div className="text-center pt-1">
                        <Link
                          to={`/products?category=${encodeURIComponent(m.categoryName)}`}
                          onClick={() => setIsOpen(false)}
                          className="text-xs font-medium text-brown-700 hover:underline inline-flex items-center gap-1"
                        >
                          View all in {m.categoryName} ({m.totalMatching}) →
                        </Link>
                      </div>
                    )}
                    {m.searchQuery && m.totalMatching > 4 && (
                      <div className="text-center pt-1">
                        <Link
                          to={`/products?search=${encodeURIComponent(m.searchQuery)}`}
                          onClick={() => setIsOpen(false)}
                          className="text-xs font-medium text-brown-700 hover:underline inline-flex items-center gap-1"
                        >
                          View all {m.totalMatching} matching products →
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Contact Buttons */}
                {(m.contactButtons || m.inquiryAction) && (
                  <div className="mt-2.5 w-full flex flex-col gap-1.5">
                    <button
                      onClick={() => handleOpenInquiry('', '', '', 'whatsapp')}
                      className="w-full text-center px-3 py-2 bg-brown-800 hover:bg-brown-900 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Open Wholesale Inquiry Form
                    </button>

                    <div className="grid grid-cols-3 gap-1.5">
                      <a
                        href={`https://wa.me/${PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello I3 Innovation, I have a wholesale inquiry.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>

                      <a
                        href={`tel:${PHONE}`}
                        className="px-2 py-1.5 bg-brown-700 hover:bg-brown-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                      </a>

                      <button
                        onClick={() => handleOpenInquiry('', '', '', 'mail')}
                        className="px-2 py-1.5 bg-white border border-brown-300 hover:bg-brown-50 text-brown-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 text-center cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <form onSubmit={handleInputSubmit} className="p-2.5 bg-white border-t border-brown-100 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about products, fabrics, MOQ..."
              className="flex-1 bg-brown-50/70 border border-brown-200 rounded-xl px-3.5 py-2 text-xs text-brown-900 placeholder-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-600 focus:border-brown-600 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              aria-label="Send message"
              className="p-2 rounded-xl bg-brown-800 text-white hover:bg-brown-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Connected Wholesale Inquiry Modal */}
      <WholesaleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        mode={inquiryMode}
        prefilledCategory={inquiryPrefilledCategory}
        prefilledProduct={inquiryPrefilledProduct}
        prefilledProductId={inquiryPrefilledProductId}
      />
    </>
  );
}
