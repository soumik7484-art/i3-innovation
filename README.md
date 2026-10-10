# I3 Innovation — Official Web Portal & Catalog

Modern, responsive web platform and wholesale catalog for **I3 Innovation**, an ISO 9001:2015 certified apparel and uniform manufacturer based in Kolkata, West Bengal, India.

---

## 📁 Project Structure

```text
i3-innovation/
├── README.md                      # Project documentation and deployment guide
├── .gitignore                     # Git ignore rules for node_modules, dist, temp files
├── dataset.json                   # Scraped product dataset (78 items, 12 categories)
├── dataset.csv                    # Tabular CSV export of catalog data
├── dataset_report.md              # Detailed catalog audit & field breakdown report
├── scraper.py                     # Python scraper script for data harvesting
├── scraper.log                    # Scraper run logs
├── logo.png                       # High-resolution company brand mark
├── google-apps-script/            # Google Sheets/Forms webhook integration scripts
├── images/                        # Raw scraped and source asset images
└── website/                       # Main Vite + React frontend web application
    ├── package.json               # Node dependencies and build scripts
    ├── vite.config.js             # Vite configuration with Tailwind CSS plugin
    ├── index.html                 # Single Page Application HTML entry point
    ├── public/                    # Static public assets served directly
    │   ├── .htaccess              # Apache URL rewrite rules for Hostinger SPA routing
    │   ├── certificate.png        # ISO 9001:2015 Quality Management System certificate
    │   ├── iec-certificate.jpg    # DGFT Importer-Exporter Code (IEC) certificate
    │   ├── gst-certificate.jpg    # Form GST REG-06 registration certificate
    │   ├── trustseal-2021.jpg     # IndiaMART TrustSEAL (2021) certificate
    │   ├── trustseal-2024.jpg     # IndiaMART TrustSEAL (2024) certificate
    │   ├── favicon.svg            # Site favicon
    │   ├── logo.png               # Web header brand logo
    │   ├── office-bg.jpg          # Facility and background photography
    │   ├── person.png             # Director & leadership photography
    │   └── icons.svg              # SVG sprite icons
    └── src/
        ├── main.jsx               # React DOM root entry point
        ├── App.jsx                # React Router v7 routes & layout setup
        ├── index.css              # Tailwind CSS imports & color design tokens
        ├── assets/                # Bundled graphic assets (hero artwork, banners)
        ├── data/                  # Processed catalog data feeds for the UI
        │   ├── company.json       # Corporate info, location, contact, badges
        │   ├── categories.json    # 12 wholesale categories with counts & thumbnails
        │   ├── products.json      # Complete 78-product catalog with specs & pricing
        │   └── filters.json       # Attribute filter values (fabrics, sizes, colors)
        ├── components/            # Reusable UI components
        │   ├── Navbar.jsx         # Sticky header with navigation & contact trigger
        │   ├── Footer.jsx         # Footer with quick links, CTA banner, and contacts
        │   ├── ProductCard.jsx    # Product grid card with hover zoom & price info
        │   ├── CategoryCard.jsx   # Visual category link card
        │   ├── ImageGallery.jsx   # Multi-image viewer with fullscreen lightbox
        │   ├── EmptyState.jsx     # Fallback placeholder for empty queries
        │   ├── Chatbot.jsx        # Interactive instant search & product advisor
        │   └── WholesaleInquiryModal.jsx # Mail & WhatsApp inquiry modal dialog
        └── pages/                 # Route page views
            ├── HomePage.jsx       # Hero, category cards, featured items, USP highlights
            ├── ProductsPage.jsx   # Full catalog with search, multi-category filters, sort
            ├── ProductDetailPage.jsx # Individual product specifications, attributes, MOQ
            ├── CategoriesPage.jsx # Category index with overview metrics
            ├── AboutPage.jsx      # Company history, craft, team, certificates lightbox, future
            ├── PhotosPage.jsx     # Masonry visual product showcase with lightbox
            ├── VideosPage.jsx     # Video portal page
            └── ReviewsPage.jsx    # Institutional customer feedback & reviews
```

---

## 🛠️ Local Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Setup & Installation
```bash
# Clone the repository
git clone https://github.com/soumik7484-art/i3-innovation.git

# Navigate into the frontend app
cd i3-innovation/website

# Install dependencies
npm install

# Start the Vite local development server
npm run dev
```

The site will be running at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
This generates the optimized, production-ready static assets in the `website/dist/` directory.

---

## 🌐 How to Host on Hostinger (`i3innovation.in`)

Hostinger Web Hosting provides Apache/LiteSpeed web servers under **hPanel**. Since this is a React Single Page Application (SPA), all routing is handled client-side by React Router.

### Method 1: File Manager / FTP Upload (Recommended & Quickest)

#### Step 1: Generate the Production Build locally
Open your terminal in the `website` directory and build the project:
```bash
cd website
npm install
npm run build
```
This will create a `dist` folder inside `website/` (`website/dist/`).

#### Step 2: Prepare the Files
The `website/dist/` folder contains:
- `index.html`
- `.htaccess` *(automatically copied to ensure SPA routing works)*
- `assets/` (bundled JS & CSS)
- Certificates and images (`certificate.png`, `iec-certificate.jpg`, etc.)

> **Tip:** You can zip the contents of `website/dist/` into a file named `dist.zip` for faster upload.

#### Step 3: Upload to Hostinger hPanel
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Under **Websites**, select **`i3innovation.in`** and click **Manage**.
3. In the left sidebar or dashboard, click **File Manager** (Files -> File Manager).
4. Navigate to the **`public_html`** directory:
   - If there is a default `default.php` or `index.php` created by Hostinger, delete or move it.
5. Click the **Upload** button (top right), choose your `dist.zip` (or upload all files inside `website/dist/` directly).
6. If you uploaded `dist.zip`, right-click on it in File Manager and select **Extract** directly into `public_html`.
7. Ensure that `index.html` and `.htaccess` are directly in the root of `public_html` (i.e., `public_html/index.html`, NOT `public_html/dist/index.html`).

---

### Method 2: Git Auto-Deployment via Hostinger hPanel

If your Hostinger plan includes Git integration:
1. In Hostinger hPanel for **`i3innovation.in`**, go to **Advanced -> Git**.
2. Set Repository: `https://github.com/soumik7484-art/i3-innovation.git`
3. Branch: `main`
4. Install path: `public_html` (or build using GitHub Actions / Hostinger SSH terminal).
5. Run `cd website && npm install && npm run build` via SSH terminal, and symlink or copy `website/dist/*` to `public_html/`.

---

### ⚠️ Important: Handling SPA Routing (Refresh 404 Prevention)

Because this website uses React Router (e.g. `/about`, `/products`, `/categories`), refreshing any internal page on Hostinger could cause an Apache `404 Not Found` if Apache tries to find a physical file matching that URL.

This project includes a pre-configured **`.htaccess`** in `website/public/.htaccess` which gets copied to `website/dist/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Make sure **`.htaccess`** is present inside `public_html/` on Hostinger. If hidden files are not visible in Hostinger File Manager, click the settings gear in File Manager and toggle **Show Hidden Files (dotfiles)**.

---

### 🔒 SSL & Domain Verification on Hostinger

1. In Hostinger hPanel, go to **Security -> SSL**.
2. Activate the **Free Let's Encrypt SSL** certificate for `i3innovation.in` and `www.i3innovation.in`.
3. Enable **Force HTTPS** toggle so all HTTP traffic automatically redirects to secure HTTPS.
4. Visit `https://i3innovation.in` to test live navigation, product filters, certificate modal, and inquiry actions.
