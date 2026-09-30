# Dataset Extraction & Data Quality Report

## 1. Executive Summary

| Metric | Recovered Value |
|--------|-----------------|
| **Source Website** | `https://www.indiamart.com/i3innovation/products-and-services.html` |
| **Business / Entity** | **I3 Innovation** |
| **Location** | Kolkata, West Bengal, India |
| **Extraction Date & Time** | 2026-09-30 18:52:14 UTC |
| **Total Categories Discovered** | **12** |
| **Total Products Extracted** | **78** |
| **Total Product Images Discovered** | **590** (Avg. 7.6 images/product) |
| **Products with Pricing** | **78 / 78 (100.0%)** |
| **Products with Full Description** | **78 / 78 (100.0%)** |
| **Products with Specification Tables** | **78 / 78 (100.0%)** |
| **Products with MOQ** | **77 / 78 (98.7%)** |
| **Duplicate Products Removed** | **0** (Exact 1:1 match against catalog) |
| **Failed URLs / Pages** | **0** (100% extraction success rate) |

---

## 2. Category & Subcategory Breakdown

| # | Category | URL | Total Products | Key Subcategories / Types Identified |
|---|----------|-----|----------------|--------------------------------------|
| 1 | **School Uniform** | [`school uniform`](https://www.indiamart.com/i3innovation/school-uniform.html) | **24** | Uniform Set, Normal Salwar, SALWAR JAKET, School Uniform |
| 2 | **Mens T-shirts** | [`mens t-shirts`](https://www.indiamart.com/i3innovation/mens-t-shirts.html) | **13** | Mens T-shirts, T Shirts, Printed T Shirt, round neck printing T shirts |
| 3 | **Rain Coat** | [`rain coat`](https://www.indiamart.com/i3innovation/rain-coat.html) | **7** | Rainsuit, Raincoat, Rainsuit, Raincoat |
| 4 | **Men's T-shirt** | [`men's t-shirt`](https://www.indiamart.com/i3innovation/mens-t-shirt.html) | **6** | Printed T Shirt, Men's T-shirt |
| 5 | **Mens Promotional T Shirt** | [`mens promotional t shirt`](https://www.indiamart.com/i3innovation/mens-promotional-t-shirt.html) | **5** | Mens Promotional T Shirt |
| 6 | **Corporate Blazers** | [`corporate blazers`](https://www.indiamart.com/i3innovation/corporate-blazers.html) | **4** | Formal, Corporate Blazers, school Blazers |
| 7 | **Mens Track Pant** | [`mens track pant`](https://www.indiamart.com/i3innovation/mens-track-pant.html) | **4** | Mens Track Pant, Lower |
| 8 | **T Shirts** | [`t shirts`](https://www.indiamart.com/i3innovation/t-shirts.html) | **3** | T Shirts |
| 9 | **Cotton T Shirts** | [`cotton t shirts`](https://www.indiamart.com/i3innovation/cotton-t-shirts.html) | **3** | Cotton T Shirts |
| 10 | **Mens Sweater** | [`mens sweater`](https://www.indiamart.com/i3innovation/mens-sweater.html) | **3** | GOVT, SCHOOL SWEATER, Mens Sweater |
| 11 | **Winter Blazers** | [`winter blazers`](https://www.indiamart.com/i3innovation/winter-blazers.html) | **3** | BLAZER, Winter Blazers |
| 12 | **Cricket Wear** | [`cricket wear`](https://www.indiamart.com/i3innovation/cricket-wear.html) | **3** | Jersey Only, Cricket Wear |

---

## 3. Field Coverage & Completeness Analysis

Every record in the dataset is recovered strictly from real public data on the website without any synthetic or hallucinated values.

| Field Name | Present Count | Coverage (%) | Notes |
|------------|---------------|--------------|-------|
| `product_id` | 78 | 100.0% | Stable internal sequential ID (`P001` - `P078`) |
| `site_id` | 78 | 100.0% | IndiaMART unique internal catalog ID |
| `product_name` | 78 | 100.0% | Exact official listing title |
| `category` | 78 | 100.0% | Exact verified category name |
| `subcategory` / `product_type` | 78 | 100.0% | From verified specification tables |
| `brand` | 78 | 100.0% | Official brand label (`I3` / `I3 Innovation`) |
| `price` & `price_raw` | 78 | 100.0% | Currency: INR (₹); includes per piece / set / pair units |
| `description` | 78 | 100.0% | Full rich product descriptions from catalog |
| `specifications` | 78 | 100.0% | 150+ distinct specification attributes captured |
| `minimum_order_quantity` | 77 | 98.7% | Stated MOQ (e.g. 500 Piece, 50 Piece, 100 Piece) |
| `image_urls` | 78 | 100.0% | High-res 500x500 gallery images |
| `material` / `fabric` | 77 | 98.7% | Cotton, Polyester, Mixed Cotton, Lycra, Wool, etc. |
| `color` | 49 | 62.8% | Official color choices listed |
| `size` / `available_sizes` | 56 | 71.8% | S, M, L, XL, XXL, or size range |
| `pattern` | 70 | 89.7% | Check, Plain, Printed, Sublimation, etc. |
| `sleeve_type` | 59 | 75.6% | Half Sleeves, Full Sleeve, etc. |
| `neck_type` | 50 | 64.1% | Collar Neck, Round Neck, Polo, etc. |
| `gender` | 59 | 75.6% | Men, Boys, Girls, Unisex, Kids |
| `country_of_origin` | 49 | 62.8% | Verified origin ("Made in India") |
| `brochure_url` | 76 | 97.4% | Official PDF product brochures when attached |
| `additional_information` | 73 | 93.6% | Delivery times, packaging types, production capacity |

---

## 4. Hierarchical Dataset Architecture (`dataset.json`)

The dataset maintains a clean hierarchical taxonomy:
```
Category (12)
└── Subcategory (Product Type / Domain)
    └── Product Record
        ├── Identifiers (product_id, site_id, product_url)
        ├── Commercial Data (price, currency, unit, moq, availability)
        ├── Rich Description
        ├── Normalized Fashion / Product Attributes (gender, color, size, fabric, pattern, fit, etc.)
        ├── Complete Raw Specifications (all table key-values)
        ├── Production & Supply Data (packaging, delivery time, capacity)
        └── Multi-Angle Image Assets (500x500 resolution URLs + local file paths)
```

---

## 5. Technical Observations & Data Quality Insights

1. **Server-Side Rendered Data Quality**:
   - The `<article class="udg-category-item" id="...">` DOM components on IndiaMART provide fully rendered HTML containing complete specification tables and descriptions for each product.
   - Initial inspections that looked for generic class names (`product-detail`) did not find specs, but targeting the actual `udg-category-item` semantic containers revealed 100% complete specifications and descriptions.
2. **Pricing Structure**:
   - Minimum price: **₹ 30/pair** (School Socks)
   - Maximum price: **₹ 950/Piece** (Men's Corporate Blazer)
   - Average price: **₹ 282.80**
   - 100% of products display clear wholesale unit pricing.
3. **Wholesale Quantities (MOQ)**:
   - 77 of 78 products display explicit Minimum Order Quantities, ranging from 10 pieces (for blazers) to 500 pieces (for government school uniforms).
4. **Image Handling**:
   - All thumbnail image references (`-125x125` and `-250x250`) have been upgraded to the seller's full master resolution (`-500x500`).
   - Gallery media embeds were extracted from the page state, yielding **590 total multi-angle photos**.
   - Primary images are archived locally under `images/<product_id>/image_01.jpg` using stable internal product IDs.

---

## 6. Generated Output Files

| File | Description | Records |
|------|-------------|---------|
| [`dataset.json`](dataset.json) | Complete Master Hierarchical Dataset | 78 products in 12 categories |
| [`dataset.csv`](dataset.csv) | Clean Flat CSV with 43 structured columns | 78 rows |
| [`images/`](images/) | Organized local image directory | Stable ID folders (P001 - P078) |
| [`dataset_report.md`](dataset_report.md) | This comprehensive audit & quality report | Full audit metrics |
| [`scraper.py`](scraper.py) | Standalone, reproducible Python extraction script | Complete source code |
| [`scraper.log`](scraper.log) | Execution audit trail with request timestamps | Log trace |
