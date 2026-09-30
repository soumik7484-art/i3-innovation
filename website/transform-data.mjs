/**
 * Data Transformation Layer
 * Converts the scraper's dataset.json into frontend-ready structures.
 * This is a BUILD-TIME script — run once to generate src/data/products.json etc.
 * 
 * IMPORTANT: This does NOT modify scraper.py or dataset.json.
 * It only reads dataset.json and produces optimized frontend data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasetPath = path.resolve(__dirname, '..', 'dataset.json');
const outputDir = path.resolve(__dirname, 'src', 'data');

// Read the scraper dataset
const raw = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

// ─── 1. Flatten all products ───────────────────────────────────────────────

const allProducts = [];
const categoriesMap = {};

for (const cat of raw.categories) {
  categoriesMap[cat.category_name] = {
    name: cat.category_name,
    url: cat.category_url,
    productCount: cat.product_count,
    // Use the first product's primary image as category thumbnail
    thumbnail: null,
  };

  for (const subcat of cat.subcategories) {
    for (const product of subcat.products) {
      const p = {
        id: product.product_id,
        siteId: product.site_id,
        name: product.product_name,
        category: product.category,
        subcategory: product.subcategory,
        productType: product.product_type || product.subcategory,
        brand: product.brand,
        description: product.description || null,
        price: product.price,
        currency: product.currency,
        priceUnit: product.price_unit,
        priceRaw: product.price_raw,
        availability: product.availability,
        moq: product.minimum_order_quantity || null,
        productUrl: product.product_url,
        brochureUrl: product.brochure_url || null,
        // Use remote image URLs (more complete, 500x500)
        images: product.image_urls || [],
        // Local images as fallback
        localImages: (product.local_images || []).map(img => `/${img}`),
        // Structured attributes
        gender: product.attributes?.gender || null,
        color: product.attributes?.color || null,
        size: product.attributes?.size || null,
        availableSizes: product.attributes?.available_sizes || null,
        material: product.attributes?.material || null,
        fabric: product.attributes?.fabric || null,
        pattern: product.attributes?.pattern || null,
        fit: product.attributes?.fit || null,
        sleeveType: product.attributes?.sleeve_type || null,
        neckType: product.attributes?.neck_type || null,
        occasion: product.attributes?.occasion || null,
        ageGroup: product.attributes?.age_group || null,
        gsm: product.attributes?.gsm || null,
        washCare: product.attributes?.wash_care || null,
        countryOfOrigin: product.attributes?.country_of_origin || null,
        customization: product.attributes?.customization || null,
        // Raw specs for detail page
        specifications: product.specifications || {},
        additionalInfo: product.additional_information || {},
      };

      allProducts.push(p);

      // Set category thumbnail from first product
      if (!categoriesMap[cat.category_name].thumbnail && p.images.length > 0) {
        categoriesMap[cat.category_name].thumbnail = p.images[0];
      }
    }
  }
}

// ─── 2. Build categories array ─────────────────────────────────────────────

const categories = Object.values(categoriesMap);

// ─── 3. Build company info ─────────────────────────────────────────────────

const company = {
  name: raw.metadata.company,
  location: raw.metadata.location,
  source: raw.metadata.source,
  totalProducts: raw.metadata.total_products,
  totalCategories: raw.metadata.total_categories,
  totalImages: raw.metadata.total_images,
  extractionDate: raw.metadata.extraction_date,
};

// ─── 4. Build filter options (only from real data) ─────────────────────────

const filterOptions = {
  categories: categories.map(c => c.name),
  fabrics: [...new Set(allProducts.map(p => p.fabric).filter(Boolean))].sort(),
  patterns: [...new Set(allProducts.map(p => p.pattern).filter(Boolean))].sort(),
  colors: [...new Set(allProducts.map(p => p.color).filter(Boolean))].sort(),
  genders: [...new Set(allProducts.map(p => p.gender).filter(Boolean))].sort(),
  priceMin: Math.min(...allProducts.map(p => p.price)),
  priceMax: Math.max(...allProducts.map(p => p.price)),
};

// ─── 5. Write outputs ──────────────────────────────────────────────────────

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, 'products.json'),
  JSON.stringify(allProducts, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(outputDir, 'categories.json'),
  JSON.stringify(categories, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(outputDir, 'company.json'),
  JSON.stringify(company, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(outputDir, 'filters.json'),
  JSON.stringify(filterOptions, null, 2),
  'utf-8'
);

console.log(`✅ Transformed ${allProducts.length} products`);
console.log(`✅ ${categories.length} categories`);
console.log(`✅ Filter options generated`);
console.log(`✅ Company info saved`);
console.log(`\nOutput files in: ${outputDir}`);
