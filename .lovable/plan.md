# Add new products and Accessories & Parts section

## What to add

### 1. New products in existing categories (`src/lib/products.ts`)

**LED Screen Displays → Indoor LED Displays** — add:
- **Front Desk LED Screen (FD Series)** — reception/front-desk wrap-around LED for branded check-in counters.
- **Double-Sided Indoor LED Screen (DB Series)** — fixed back-to-back indoor LED for 180°+ visibility in aisles and lobbies.

**LCD Screens & Kiosks → Touch Kiosks** (or new subcategory "Interactive Displays") — add:
- **Interactive LCD Screen / Interactive Whiteboard** — multi-touch collaborative display for classrooms, meeting rooms, training centres.

I'll place the Interactive Whiteboard in a new subcategory **"Interactive Displays"** under LCD Screens & Kiosks (cleaner than nesting under Touch Kiosks, since whiteboards are a distinct use case).

### 2. New top-level category: **Accessories & Parts**

New entry in `CATEGORIES` array with slug `accessories-parts`, with these subcategories/products pulled from the catalogue:

- **Power & Cabling**
  - Power Supply Unit
  - Optic Fiber Cable Reel (Cat5e / Cat6a / Cat7)
- **Mounting Systems**
  - Ground Support System
  - Wall Mount Frame
  - Trolly Cart
- **Service Tools**
  - Vacuum Suction Cup
  - Flight Case

### 3. Images

Generate placeholder category/subcategory/product images via `imagegen` for:
- `cat-accessories.jpg` (new top-level category hero)
- `sub-accessories-power.jpg`, `sub-accessories-mounting.jpg`, `sub-accessories-tools.jpg`
- `front-desk-led.jpeg`, `double-sided-indoor-led.jpeg`, `interactive-whiteboard.jpeg`

Wire them into `src/lib/productImages.ts` so product cards pick them up.

### 4. Navigation

`Navbar.tsx` and `ProductCatalogAccordion.tsx` already iterate `CATEGORIES`, so the new category appears automatically. I'll add an appropriate lucide `icon` string (`"package"` for Accessories).

## Out of scope
- Other missing catalogue items previously listed (COB CB, Transparent Mesh Outdoor, Soft/Transparent Rental, Outdoor Foldable Poster PE) — not requested this round.
- No backend/data changes; product data is static in `src/lib/products.ts`.

## Files to change
- `src/lib/products.ts` — add 2 indoor LED products, 1 new LCD subcategory + product, 1 new top-level category with 3 subcategories and 7 products.
- `src/lib/productImages.ts` — map new product names to new image assets.
- `src/assets/...` — 7 new generated images.
