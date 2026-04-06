// Product catalog for the perfume store
export const products = [
  {
    id: 1,
    name: "Azzaro Most Wanted",
    category: "Men",
    price: 7999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 245,
    image: "https://cdn.notinoimg.com/detail_main_hq/azzaro/3614274411164_07/the-most-wanted-parfum___250404.jpg",
    description: "A sophisticated blend of dark woods and spices. Perfect for evening wear.",
    ingredients: ["Cedarwood", "Vetiver", "Black Pepper"],
    volume: "100ml",
    concentration: "Eau de Parfum"
  },
  {
    id: 2,
    name: "Gucci Flaura",
    category: "Women",
    price: 10999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 312,
    image: "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1688578221/757362_99999_0099_002_100_0000_Light-Gucci-Flora-Gorgeous-Magnolia-50ml-eau-de-parfum.jpg",
    description: "Fresh floral notes with hints of peach and jasmine. A romantic daytime fragrance.",
    ingredients: ["Jasmine", "Peach", "Sandalwood"],
    volume: "100ml",
    concentration: "Eau de Parfum"
  },
  {
    id: 3,
    name: "Calvin Klein CK One",
    category: "Unisex",
    price: 3999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 189,
    image: "https://calvinklein-eu.scene7.com/is/image/CalvinKleinEU/9350179620_MUL_alternate1?$b2c_updp_m_mainImage_1920$",
    description: "Crisp aquatic notes capturing the essence of sea salt and mist.",
    ingredients: ["Sea Salt", "Bergamot", "Aquatic Notes"],
    volume: "100ml",
    concentration: "Eau de Toilette"
  },
  {
    id: 4,
    name: "Coco Mademoiselle by Chanel",
    category: "Women",
    price: 14999,
    originalPrice: 17999,
    rating: 4.7,
    reviews: 278,
    image: "https://puls-img.chanel.com/1677515196476-01majorpushoneplpmobile1500x1600pxedpijpg_1600x1500.jpg",
    description: "Luxurious rose with vanilla and musk. A timeless classic with modern twist.",
    ingredients: ["Rose", "Vanilla", "Musk"],
    volume: "100ml",
    concentration: "Eau de Parfum"
  },
  {
    id: 5,
    name: "Eau d'Ombre Leather by Tom Ford",
    category: "Men",
    price: 21999,
    originalPrice: 27999,
    rating: 4.5,
    reviews: 156,
    image: "https://media.parfumo.com/perfume_imagery/a7/a7cc38-eau-d-ombre-leather-tom-ford_1200.jpg",
    description: "Warm amber and leather create a bold, masculine fragrance.",
    ingredients: ["Amber", "Leather", "Tobacco"],
    volume: "100ml",
    concentration: "Eau de Parfum"
  },
  {
    id: 6,
    name: "Lattafa Khamrah Qahwa",
    category: "Unisex",
    price: 3499,
    originalPrice: 5999,
    rating: 4.4,
    reviews: 203,
    image: "https://fyvspa.cl/wp-content/uploads/2024/08/KHAMRAH-QAHWA-2.jpg",
    description: "Energetic citrus blend perfect for everyday wear.",
    ingredients: ["Lemon", "Grapefruit", "Neroli"],
    volume: "100ml",
    concentration: "Eau de Toilette"
  },
  {
    id: 7,
    name: "Valomont Palazzo Nobile Sea Bliss ",
    category: "Unisex",
    price: 5699,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 267,
    image: "https://media.parfumo.com/perfumes/70/70b416-palazzo-nobile-sea-bliss-valmont_1200.jpg?width=720&aspect_ratio=1:1",
    description: "Calming lavender with subtle herbal notes. Stress-relief in a bottle.",
    ingredients: ["Lavender", "Mint", "Bergamot"],
    volume: "100ml",
    concentration: "Eau de Cologne"
  },
  {
    id: 8,
    name: "Roja Men Eau De Parfum",
    category: "Men",
    price: 20999,
    originalPrice: 23999,
    rating: 4.6,
    reviews: 198,
    image: "https://tse3.mm.bing.net/th/id/OIP.qP7FkiejVarBdDYWU8DYsgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Rich blend of spices with oriental notes. For the adventurous soul.",
    ingredients: ["Cardamom", "Clove", "Cinnamon"],
    volume: "100ml",
    concentration: "Eau de Parfum"
  }
];

// Product categories
export const categories = ["All Products", "Men", "Women", "Unisex"];

// Get products by category
export const getProductsByCategory = (category) => {
  if (category === "All Products" || !category) {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
