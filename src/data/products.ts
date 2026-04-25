import type { Product } from "../types";

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👜" },
  { id: "home", name: "Home & Living", icon: "🛋️" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "sports", name: "Sports", icon: "🏀" },
  { id: "books", name: "Books", icon: "📚" },
];

// Curated high-quality product photos.
// Locally-generated images live in /images/, others use Unsplash CDN.
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS: Product[] = [
  // ---------- ELECTRONICS ----------
  { id: "e1", name: "Aurora Wireless Headphones", price: 189, oldPrice: 249, category: "electronics", rating: 4.8, reviews: 1284, description: "Studio-grade ANC headphones with 40-hour battery life and crystal-clear audio engineered for audiophiles.", image: "🎧", photo: "/images/headphones.jpg", gradient: "from-indigo-500 to-purple-600", badge: "Bestseller", stock: 23 },
  { id: "e2", name: "Nova Smartwatch Pro", price: 329, category: "electronics", rating: 4.6, reviews: 842, description: "Always-on AMOLED display, ECG, GPS, and 7-day battery in a titanium chassis.", image: "⌚", photo: "/images/smartwatch.jpg", gradient: "from-cyan-500 to-blue-600", stock: 17 },
  { id: "e3", name: "Pulse Bluetooth Speaker", price: 79, oldPrice: 99, category: "electronics", rating: 4.5, reviews: 530, description: "Pocket-sized 360° sound with deep bass and IPX7 waterproof design.", image: "🔊", photo: "/images/speaker.jpg", gradient: "from-rose-500 to-orange-500", badge: "Sale", stock: 56 },
  { id: "e4", name: "Lumen Mechanical Keyboard", price: 149, category: "electronics", rating: 4.9, reviews: 2104, description: "Hot-swappable RGB mechanical keyboard with PBT keycaps and silky linear switches.", image: "⌨️", photo: "/images/keyboard.jpg", gradient: "from-emerald-500 to-teal-600", stock: 41 },
  { id: "e5", name: "Vista 4K Webcam", price: 119, category: "electronics", rating: 4.4, reviews: 318, description: "Crystal-clear 4K streaming with auto-framing AI and dual noise-canceling mics.", image: "📷", photo: U("photo-1502920917128-1aa500764cbd"), gradient: "from-fuchsia-500 to-pink-600", stock: 9 },
  { id: "e6", name: "Quantum Gaming Mouse", price: 89, category: "electronics", rating: 4.7, reviews: 967, description: "26K DPI sensor, 70-hour battery, weighing only 58g for esports performance.", image: "🖱️", photo: U("photo-1527814050087-3793815479db"), gradient: "from-violet-500 to-indigo-600", stock: 33 },

  // ---------- FASHION ----------
  { id: "f1", name: "Heritage Leather Tote", price: 245, category: "fashion", rating: 4.8, reviews: 412, description: "Hand-stitched full-grain leather tote that ages beautifully with everyday use.", image: "👜", photo: "/images/leather-bag.jpg", gradient: "from-amber-600 to-orange-700", badge: "New", stock: 14 },
  { id: "f2", name: "Cloud Knit Sneakers", price: 129, oldPrice: 159, category: "fashion", rating: 4.6, reviews: 1820, description: "Featherlight knit upper with responsive foam sole — feels like walking on clouds.", image: "👟", photo: "/images/sneakers.jpg", gradient: "from-sky-400 to-indigo-500", stock: 62 },
  { id: "f3", name: "Aviator Sunglasses", price: 89, category: "fashion", rating: 4.5, reviews: 644, description: "Polarized UV400 lenses in a timeless gold-tone titanium frame.", image: "🕶️", photo: U("photo-1572635196237-14b3f281503f"), gradient: "from-slate-700 to-zinc-900", stock: 27 },
  { id: "f4", name: "Cashmere Crew Sweater", price: 175, category: "fashion", rating: 4.9, reviews: 305, description: "Pure Mongolian cashmere — incredibly soft, warm, and perfectly tailored.", image: "🧥", photo: U("photo-1576566588028-4147f3842f27"), gradient: "from-rose-300 to-pink-500", stock: 19 },
  { id: "f5", name: "Classic Chronograph Watch", price: 399, category: "fashion", rating: 4.7, reviews: 211, description: "Swiss movement chronograph with sapphire crystal and Italian leather strap.", image: "⌚", photo: U("photo-1524592094714-0f0654e20314"), gradient: "from-yellow-600 to-amber-800", stock: 7 },
  { id: "f6", name: "Wool Felt Fedora", price: 65, category: "fashion", rating: 4.3, reviews: 132, description: "100% wool felt with grosgrain band — a versatile statement piece.", image: "🎩", photo: U("photo-1514327605112-b887c0e61c0a"), gradient: "from-stone-600 to-stone-900", stock: 24 },

  // ---------- HOME ----------
  { id: "h1", name: "Glow Aroma Diffuser", price: 49, category: "home", rating: 4.6, reviews: 980, description: "Ultrasonic diffuser with 7 ambient light modes and whisper-quiet mist.", image: "🕯️", photo: "/images/diffuser.jpg", gradient: "from-purple-400 to-pink-500", badge: "Popular", stock: 88 },
  { id: "h2", name: "Linen Throw Blanket", price: 89, category: "home", rating: 4.8, reviews: 422, description: "Stonewashed Belgian linen throw — breathable, cozy, and beautifully draped.", image: "🛏️", photo: U("photo-1600585154340-be6161a56a0c"), gradient: "from-emerald-300 to-teal-500", stock: 31 },
  { id: "h3", name: "Sculpted Ceramic Vase", price: 72, category: "home", rating: 4.5, reviews: 156, description: "Hand-thrown matte ceramic vase with organic curves — a centerpiece-ready accent.", image: "🏺", photo: U("photo-1602143407151-7111542de6e8"), gradient: "from-orange-300 to-rose-500", stock: 18 },
  { id: "h4", name: "Smart LED Floor Lamp", price: 159, category: "home", rating: 4.7, reviews: 612, description: "16M color smart lamp with app & voice control, scenes, and music sync.", image: "💡", photo: U("photo-1507473885765-e6ed057f782c"), gradient: "from-yellow-300 to-amber-500", stock: 22 },
  { id: "h5", name: "Espresso Machine Mini", price: 299, oldPrice: 349, category: "home", rating: 4.6, reviews: 740, description: "Compact 15-bar espresso maker with steam wand for café-quality drinks at home.", image: "☕", photo: "/images/espresso.jpg", gradient: "from-amber-700 to-stone-900", badge: "Sale", stock: 12 },
  { id: "h6", name: "Bamboo Cutting Board Set", price: 39, category: "home", rating: 4.4, reviews: 268, description: "Set of 3 sustainable bamboo boards with juice grooves and easy-grip handles.", image: "🪵", photo: U("photo-1594385208974-2e75f8d7bb48"), gradient: "from-lime-500 to-emerald-700", stock: 47 },

  // ---------- BEAUTY ----------
  { id: "b1", name: "Hydra Glow Serum", price: 58, category: "beauty", rating: 4.9, reviews: 3201, description: "Hyaluronic acid + niacinamide serum for plump, dewy, hydrated skin.", image: "🧴", photo: "/images/cosmetics.jpg", gradient: "from-pink-400 to-rose-500", badge: "Top Rated", stock: 95 },
  { id: "b2", name: "Velvet Matte Lipstick", price: 28, category: "beauty", rating: 4.6, reviews: 1102, description: "Long-wearing matte finish enriched with vitamin E — comfort meets pigment.", image: "💄", photo: U("photo-1586495777744-4413f21062fa"), gradient: "from-red-500 to-rose-700", stock: 120 },
  { id: "b3", name: "Botanical Face Mask", price: 22, category: "beauty", rating: 4.5, reviews: 489, description: "Clay & green tea mask to detoxify pores and refresh skin in 10 minutes.", image: "🌿", photo: U("photo-1556228720-195a672e8a03"), gradient: "from-green-400 to-emerald-600", stock: 66 },
  { id: "b4", name: "Silk Hair Oil", price: 34, category: "beauty", rating: 4.7, reviews: 822, description: "Argan + jojoba blend that smooths frizz and adds mirror-like shine.", image: "💆", photo: U("photo-1620916566398-39f1143ab7be"), gradient: "from-amber-300 to-orange-500", stock: 53 },

  // ---------- SPORTS ----------
  { id: "s1", name: "Pro Yoga Mat", price: 79, category: "sports", rating: 4.8, reviews: 1450, description: "6mm cushioned, non-slip natural rubber mat with alignment lines.", image: "🧘", photo: "/images/yoga.jpg", gradient: "from-teal-400 to-cyan-600", stock: 44 },
  { id: "s2", name: "Adjustable Dumbbells 50lb", price: 299, category: "sports", rating: 4.7, reviews: 612, description: "Space-saving adjustable dumbbells with quick-dial weight from 5 to 50 lb.", image: "🏋️", photo: U("photo-1638536532686-d610adfc8e5c"), gradient: "from-zinc-600 to-slate-900", stock: 11 },
  { id: "s3", name: "Trail Running Shoes", price: 149, category: "sports", rating: 4.6, reviews: 538, description: "Aggressive lugs and rock plate protection for confident off-road runs.", image: "👟", photo: U("photo-1542291026-7eec264c27ff"), gradient: "from-orange-500 to-red-600", stock: 26 },
  { id: "s4", name: "Insulated Water Bottle", price: 32, category: "sports", rating: 4.9, reviews: 2890, description: "Keeps cold for 24h, hot for 12h — leakproof, BPA-free stainless steel.", image: "🧴", photo: U("photo-1602143407151-7111542de6e8"), gradient: "from-blue-500 to-indigo-700", badge: "Bestseller", stock: 150 },

  // ---------- BOOKS ----------
  { id: "k1", name: "Atomic Productivity", price: 19, category: "books", rating: 4.8, reviews: 4120, description: "A practical guide to building tiny habits that compound into lasting change.", image: "📘", photo: U("photo-1544947950-fa07a98d237f"), gradient: "from-blue-500 to-cyan-600", stock: 200 },
  { id: "k2", name: "The Quiet Garden", price: 24, category: "books", rating: 4.6, reviews: 712, description: "A lyrical novel about memory, family, and the gardens that shape us.", image: "📗", photo: U("photo-1535905557558-afc4877a26fc"), gradient: "from-green-500 to-emerald-700", stock: 85 },
  { id: "k3", name: "Designing Tomorrow", price: 34, category: "books", rating: 4.7, reviews: 290, description: "An illustrated journey through the principles of modern product design.", image: "📙", photo: U("photo-1512820790803-83ca734da794"), gradient: "from-orange-500 to-amber-700", stock: 60 },
  { id: "k4", name: "Cosmos Unfolded", price: 29, category: "books", rating: 4.9, reviews: 1180, description: "An accessible tour of the universe, from quarks to galaxy clusters.", image: "📕", photo: U("photo-1497633762265-9d179a990aa6"), gradient: "from-fuchsia-600 to-purple-800", badge: "New", stock: 73 },
];
