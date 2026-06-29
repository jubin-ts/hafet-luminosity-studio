export type Product = {
  name: string;
  description: string;
  specs: string[];
  applications: string;
};

export type Subcategory = {
  slug: string;
  name: string;
  products: Product[];
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  image: string;
  icon: string; // emoji-like glyph, replaced by lucide in nav
  subcategories: Subcategory[];
};

import catLed from "@/assets/cat-led.jpg";
import catLcd from "@/assets/cat-lcd.jpg";
import catSign from "@/assets/cat-signage.jpg";
import catEsl from "@/assets/cat-esl.jpg";

export const CATEGORIES: Category[] = [
  {
    slug: "led-screen-displays",
    name: "LED Screen Displays",
    short: "Indoor, outdoor, transparent, flexible, rental & specialty LED.",
    image: catLed,
    icon: "monitor",
    subcategories: [
      {
        slug: "indoor",
        name: "Indoor LED Displays",
        products: [
          {
            name: "Wall Mount Indoor LED Screen",
            description: "Space-saving permanent wall installation.",
            specs: ["Pixel Pitch P1.2–P2.5", "High refresh rate", "High contrast"],
            applications: "Boardrooms, corporate lobbies, malls, retail shops.",
          },
          {
            name: "Portable Indoor LED Screen",
            description: "Lightweight, easy setup and teardown.",
            specs: ["Pixel Pitch P2–P3", "Quick assembly", "Freestanding"],
            applications: "Trade shows, presentations, events.",
          },
          {
            name: "Built-In Indoor LED Screen",
            description: "Seamlessly integrated into architecture.",
            specs: ["Pixel Pitch P1.5–P2.5", "High resolution", "Long lifespan"],
            applications: "Airports, hotels, conference centres, entertainment venues.",
          },
          {
            name: "Fine Pixel Indoor LED (Small Pitch)",
            description: "Ultra-fine pixels for close-up viewing.",
            specs: ["Pixel Pitch P1.2–P1.9", "3-year warranty", "Energy efficient"],
            applications: "Control rooms, home theatres, gaming areas.",
          },
        ],
      },
      {
        slug: "outdoor",
        name: "Outdoor LED Displays",
        products: [
          {
            name: "Fixed Outdoor LED Screen (SMD)",
            description: "Weatherproof permanent billboard display.",
            specs: ["P4–P10", "6,000–10,000 nits", "IP65+", "80k–100k hr lifespan"],
            applications: "Billboards, storefronts, roadsides, building facades.",
          },
          {
            name: "Hanging Outdoor LED Screen",
            description: "Suspended from ceiling or structure.",
            specs: ["High brightness", "IP65", "Cloud content management"],
            applications: "Malls, airports, event venues, transit hubs.",
          },
          {
            name: "Wall-Mounted Outdoor LED Screen",
            description: "Permanently fixed exterior installation.",
            specs: ["P6–P8", "UV-resistant", "Anti-corrosion cabinet"],
            applications: "Shopping centres, stadiums, public spaces.",
          },
          {
            name: "Pole-Mounted Outdoor LED Screen",
            description: "Secured to street poles or custom poles.",
            specs: ["High brightness", "IP65", "Real-time updates"],
            applications: "Parks, roadsides, shopping centres, bus stops.",
          },
          {
            name: "Roof-Mounted Outdoor LED Screen",
            description: "Installed on top of buildings for long-range visibility.",
            specs: ["Large format", "High brightness", "Long-range visibility"],
            applications: "Malls, stadiums, landmarks, event spaces.",
          },
        ],
      },
      {
        slug: "transparent",
        name: "Transparent LED Screens",
        products: [
          {
            name: "Mesh Transparent LED Screen",
            description: "Grid-like structure, wind-resistant, allows light passage.",
            specs: ["Up to 70% transparency", "5,000–7,000 nits", "IP65+"],
            applications: "Building facades, mall entrances, exhibitions, museums.",
          },
          {
            name: "Adhesive Transparent LED Display",
            description: "Self-adhesive LED film applied directly to glass.",
            specs: ["Up to 90% transparency", "Ultra-light", "Frameless"],
            applications: "Retail windows, glass doors, office interiors.",
          },
          {
            name: "Curtain Transparent LED Screen",
            description: "Vertically-spaced LED bars, foldable and scalable.",
            specs: ["50–70% transparency", "P3–P10", "Modular"],
            applications: "Stage backdrops, concerts, building wraps.",
          },
        ],
      },
      {
        slug: "flexible",
        name: "Flexible LED Screens",
        products: [
          {
            name: "Curved LED Display",
            description: "Smooth inward/outward curved panels, custom curve radius.",
            specs: ["Wide viewing angles", "High resolution", "Wall or freestanding"],
            applications: "Corporate rooms, retail, cinemas, control rooms.",
          },
          {
            name: "Cylindrical LED Display",
            description: "360° visibility round/column-shaped display.",
            specs: ["Custom height & diameter", "Modular structure"],
            applications: "Malls, showrooms, exhibitions, public spaces.",
          },
          {
            name: "Spherical LED Display",
            description: "Full sphere or dome shape, multi-directional viewing.",
            specs: ["Custom sizes", "Suspended or floor-mounted"],
            applications: "Museums, planetariums, brand installations.",
          },
          {
            name: "Interactive Flexible LED Display",
            description: "Touch and motion-responsive with gesture recognition.",
            specs: ["Fast response", "Durable surface", "Custom software"],
            applications: "Retail, schools, museums, corporate offices.",
          },
          {
            name: "Flexible Mesh LED Screen",
            description: "Lightweight with pixel gaps, partial transparency.",
            specs: ["Large area coverage", "Flexible installation"],
            applications: "Building facades, event stages, retail windows, ceilings.",
          },
          {
            name: "Rollable & Foldable LED Screen",
            description: "Ultra-thin, rolls or folds for transport.",
            specs: ["Lightweight", "Quick setup", "Easy storage"],
            applications: "Events, pop-up retail, roadshows, presentations.",
          },
        ],
      },
      {
        slug: "poster",
        name: "Poster LED Screens",
        products: [
          {
            name: "Indoor LED Poster Screen",
            description: "Slim high-resolution digital poster for close viewing.",
            specs: ["P0.9–P2.5", "500–1,000 nits", "Front/rear service"],
            applications: "Retail, hotel lobbies, museums, showrooms.",
          },
          {
            name: "Outdoor LED Poster Screen",
            description: "Weatherproof external digital poster.",
            specs: ["4,500–6,000+ nits", "IP65/IP66", "UV-resistant"],
            applications: "Storefronts, facades, transit hubs.",
          },
          {
            name: "Movable LED Poster Display",
            description: "Freestanding with integrated wheels.",
            specs: ["Lightweight", "Quick assembly"],
            applications: "Trade shows, exhibitions, pop-up stores.",
          },
          {
            name: "Dual-Sided LED Poster Display",
            description: "Screen on front and back, 180°+ visibility.",
            specs: ["P1.9–P4.0", "500–1,000 nits per side"],
            applications: "Mall aisles, trade shows, airport info points.",
          },
          {
            name: "Foldable LED Poster Display",
            description: "Modular, folds to 60–80% smaller for transport.",
            specs: ["Tool-free assembly", "Protective travel case"],
            applications: "Roadshows, touring exhibitions, multi-location campaigns.",
          },
          {
            name: "Tri-Fold LED Poster Display",
            description: "Three connected panels fold like a brochure.",
            specs: ["P2.5–P4.0", "Built-in stand", "Lightweight"],
            applications: "Trade shows, conferences, pop-up retail, real estate.",
          },
        ],
      },
      {
        slug: "rental",
        name: "Rental LED Series",
        products: [
          {
            name: "Indoor Rental LED Screen",
            description: "Lightweight panels with quick-lock system for fast setup.",
            specs: ["P2.5–P3.9", "High refresh rate"],
            applications: "Corporate events, exhibitions, concerts, conferences.",
          },
          {
            name: "Outdoor Rental LED Screen",
            description: "Weatherproof with fast assembly mechanism.",
            specs: ["P4.8–P6", "IP65", "High brightness"],
            applications: "Outdoor concerts, sports events, festivals, product launches.",
          },
        ],
      },
      {
        slug: "immersive",
        name: "Immersive LED Displays",
        products: [
          {
            name: "360° Immersive LED Room",
            description: "Floor, ceiling, and wall LED panels for a fully surrounding experience.",
            specs: ["High resolution on all surfaces", "Custom content"],
            applications: "Showrooms, museums, entertainment, brand experiences.",
          },
        ],
      },
      {
        slug: "taxi-top",
        name: "Taxi Top Display",
        products: [
          {
            name: "LED Taxi Topper Display",
            description: "Outdoor-rated rooftop display for vehicles.",
            specs: ["High brightness", "GPS compatible", "Remote CMS"],
            applications: "Taxi advertising, ride-share marketing, fleet branding.",
          },
        ],
      },
      {
        slug: "floor",
        name: "Floor LED Display",
        products: [
          {
            name: "Interactive Floor LED Screen",
            description: "Pressure-resistant tempered glass surface.",
            specs: ["Touch-interactive", "Custom content", "High durability"],
            applications: "Shopping malls, museums, events, brand activations.",
          },
        ],
      },
      {
        slug: "stadium-perimeter",
        name: "Stadium Perimeter LED",
        products: [
          {
            name: "Stadium Perimeter LED Board",
            description: "Sports stadium advertising display.",
            specs: ["High refresh for broadcast", "IP65", "Front-access", "Modular"],
            applications: "Football, cricket, basketball stadiums, sports arenas.",
          },
        ],
      },
    ],
  },
  {
    slug: "lcd-screens-kiosks",
    name: "LCD Screens & Kiosks",
    short: "Video walls, wall-mount displays, A-frames, touch kiosks & more.",
    image: catLcd,
    icon: "tv",
    subcategories: [
      {
        slug: "video-wall",
        name: "LCD Video Wall",
        products: [
          {
            name: "Narrow Bezel LCD Video Wall",
            description: "Multiple LCD panels in a grid configuration.",
            specs: ["3.5mm bezel", "178° viewing", "LED backlight", "FHD/4K", "HDMI/VGA/DVI/USB/RS232"],
            applications: "Control rooms, lobbies, retail, public displays.",
          },
        ],
      },
      {
        slug: "wall-mount",
        name: "Wall Mount LCD Displays",
        products: [
          {
            name: "Wall Mount Commercial Display",
            description: "Modern wall-mounted display for business content.",
            specs: ["16:9", "Up to 4K (3840×2160)", "16.1M colours", "USB 2.0", "SD card"],
            applications: "Offices, retail, hotels, restaurants.",
          },
        ],
      },
      {
        slug: "a-frame",
        name: "A-Frame LCD Display",
        products: [
          {
            name: "A-Frame Digital Display Screen",
            description: "Stylish framing with digital signage functionality.",
            specs: ["1080×1920", "Android 7.1", "Quad-core", "WiFi + 4G", "USB 2.0/RJ45"],
            applications: "Retail, exhibitions, presentations, lobbies.",
          },
        ],
      },
      {
        slug: "touch-kiosks",
        name: "Touch Kiosks",
        products: [
          {
            name: "Interactive Touch Kiosk",
            description: "Self-service interactive display station.",
            specs: ["IR/PCT touch", "1080×1920", "32\"–75\"", "Android/Windows"],
            applications: "Retail, hospitality, airports, banks, museums.",
          },
          {
            name: "Outdoor Touch Kiosk",
            description: "IP65 rated, sunlight-readable, vandal-proof.",
            specs: ["High brightness", "Aluminium enclosure", "IP65"],
            applications: "Bus stops, public areas, outdoor retail, parks.",
          },
        ],
      },
      {
        slug: "rotating",
        name: "Rotating LCD Displays",
        products: [
          {
            name: "Rotating Digital Display",
            description: "Switches between landscape and portrait modes.",
            specs: ["Ultra-slim", "Plug-and-play", "Multi-window"],
            applications: "Offices, classrooms, retail, public spaces.",
          },
        ],
      },
      {
        slug: "floor-standing",
        name: "Floor Standing LCD Displays",
        products: [
          {
            name: "Floor Standing Digital Signage Display",
            description: "Standalone freestanding display.",
            specs: ["FHD 1080×1920 / 4K 3840×1920", "Aluminium frame", "Multi-window"],
            applications: "Retail, trade shows, hotels, public areas.",
          },
        ],
      },
    ],
  },
  {
    slug: "3d-neon-signage",
    name: "3D Signage & Neon Signage",
    short: "Acrylic, aluminium, naked-eye 3D, totem, lightbox, neon flex & more.",
    image: catSign,
    icon: "sparkles",
    subcategories: [
      {
        slug: "3d-signage",
        name: "3D Signage",
        products: [
          { name: "3D Acrylic Signage", description: "LED-lit acrylic letters with depth and dimension.", specs: ["Indoor/outdoor", "Custom shapes & sizes"], applications: "Shops, offices, restaurants, reception areas." },
          { name: "Aluminium 3D Signage", description: "Durable metal 3D lettering built for UAE weather.", specs: ["Professional finish", "Weather-resistant"], applications: "Building exteriors, corporate offices, showrooms." },
          { name: "Naked Eye 3D LED Screen", description: "Corner LED screen creating a 3D illusion without glasses.", specs: ["Viral marketing impact", "Ultra-high resolution"], applications: "Malls, landmarks, commercial buildings, brand campaigns." },
          { name: "Totem Signage", description: "Tall freestanding structure, visible from a distance.", specs: ["Custom design", "LED-illuminated"], applications: "Advertising, wayfinding, brand promotion." },
          { name: "Lightbox Signage", description: "Backlit custom-made display for logos and promotions.", specs: ["Slim design", "Energy efficient LED backlight"], applications: "Retail, restaurants, lobbies, exhibitions." },
          { name: "Wayfinding Signage", description: "Directional signs using symbols and arrows.", specs: ["Durable materials", "Custom branding"], applications: "Airports, large buildings, hospitals, complexes." },
          { name: "Projected LED Bulb Signage", description: "Bright LED bulb projection with vivid colours.", specs: ["Visible in direct sunlight"], applications: "Outdoor advertising, storefronts, events." },
          { name: "Standalone 3D Signage", description: "Self-supporting attention-grabbing structure.", specs: ["Custom shapes", "LED-lit"], applications: "Mall entrances, exhibitions, brand activations." },
        ],
      },
      {
        slug: "neon-signage",
        name: "Neon Signage",
        products: [
          { name: "LED Neon Flex Signs", description: "Custom text and shapes in flexible neon-effect LED.", specs: ["Multiple colours & fonts", "Energy efficient", "Indoor/outdoor"], applications: "Restaurants, bars, retail, offices, events." },
          { name: "Acrylic Neon Signage", description: "Backlit acrylic with glowing neon effect.", specs: ["Custom designs", "Lightweight", "Modern finish"], applications: "Cafes, boutiques, reception areas, social media walls." },
          { name: "Solid Backlit Signage", description: "Durable construction with premium backlighting.", specs: ["Enhanced low-light visibility"], applications: "Hotels, malls, corporate offices, storefronts." },
          { name: "Chanelium Digital Signage", description: "Digital display with remote control capability.", specs: ["Real-time content updates"], applications: "Airports, malls, restaurants, large venues." },
        ],
      },
    ],
  },
  {
    slug: "electronic-shelf-solutions",
    name: "Electronic Shelf Solutions",
    short: "E-ink shelf labels and LCD shelf displays for modern retail.",
    image: catEsl,
    icon: "tag",
    subcategories: [
      {
        slug: "esl",
        name: "Electronic Shelf Labels (ESL)",
        products: [
          {
            name: "E-Ink Electronic Shelf Label",
            description: "Digital price tag with wireless remote updates.",
            specs: [
              "E-Ink, 3 colours (Black/White/Red)",
              "5-year battery",
              "10,000 labels in 10s",
              "SubGHz ISM wireless",
              "0.00001% error vs 6% manual",
              "POS / ERP / e-commerce compatible",
              "Sizes 2.9\"–7.5\"",
            ],
            applications: "Supermarkets, pharmacies, electronics stores, warehouses.",
          },
        ],
      },
      {
        slug: "esd",
        name: "Electronic Shelf Displays (ESD)",
        products: [
          {
            name: "LCD Shelf Display Screen",
            description: "Video-capable dynamic display mounted on shelves.",
            specs: ["WiFi / USB / 4G", "Remote updates", "Standard shelves & fridges compatible"],
            applications: "Supermarkets, retail, promotional campaigns, product spotlighting.",
          },
        ],
      },
    ],
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
