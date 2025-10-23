import macbookImage from "@/assets/images/macbook.png";
import iphoneImage from "@/assets/images/bluephone.png";
import laptopImage from "@/assets/images/laptops.png";
import watchImage from "@/assets/images/watch.png";
import airpodsImage from "@/assets/images/airbuds.png";
import chargersImage from "@/assets/images/chargers.png";
import product1Image from "@/assets/images/product1.png";
import product2Image from "@/assets/images/product2.png";
import orangelabtopImage from "@/assets/images/orangelabtop.png";
import airImage from "@/assets/images/air.png";

export const productsData = [
  {
    "id": 1,
    "name": "MacBook Air M2",
    "category": "Laptop",
    "brand": "Apple",
    "variants": [
      { "color": "Silver", "image": macbookImage },
      { "color": "Space Gray", "image": laptopImage }
    ],
    "price": 52000,
    "discount": 5,
    "isNew": true,
    "rating": 4.8,
    "reviewsCount": 134,
    "isFavorite": false,
    "description": "Lightweight laptop with Apple's M2 chip and Retina display."
  },
  {
    "id": 2,
    "name": "Dell XPS 13 Plus",
    "category": "Laptop",
    "brand": "Dell",
    "variants": [
      { "color": "Graphite", "image": laptopImage },
      { "color": "Platinum", "image": orangelabtopImage }
    ],
    "price": 47000,
    "discount": 10,
    "isNew": false,
    "rating": 4.5,
    "reviewsCount": 97,
    "isFavorite": true,
    "description": "Ultra-thin performance laptop with InfinityEdge display."
  },
  {
    "id": 3,
    "name": "iPhone 15 Pro",
    "category": "Phone",
    "brand": "Apple",
    "variants": [
      { "color": "Black Titanium", "image": iphoneImage },
      { "color": "White Titanium", "image": airImage }
    ],
    "price": 65000,
    "discount": 0,
    "isNew": true,
    "rating": 4.9,
    "reviewsCount": 210,
    "isFavorite": false,
    "description": "Flagship iPhone with A17 Pro chip and advanced cameras."
  },
  {
    "id": 4,
    "name": "Samsung Galaxy S24 Ultra",
    "category": "Phone",
    "brand": "Samsung",
    "variants": [
      { "color": "Titanium Gray", "image": iphoneImage },
      { "color": "Titanium Blue", "image": airImage }
    ],
    "price": 60000,
    "discount": 7,
    "isNew": true,
    "rating": 4.7,
    "reviewsCount": 180,
    "isFavorite": true,
    "description": "Premium phone with 200MP camera and S-Pen."
  },
  {
    "id": 5,
    "name": "Apple Watch Series 9",
    "category": "Watch",
    "brand": "Apple",
    "variants": [
      { "color": "Midnight", "image": watchImage },
      { "color": "Silver", "image": watchImage }
    ],
    "price": 21000,
    "discount": 3,
    "isNew": false,
    "rating": 4.6,
    "reviewsCount": 92,
    "isFavorite": false,
    "description": "Smartwatch with health tracking and Always-On display."
  },
  {
    "id": 6,
    "name": "Samsung Galaxy Watch 6",
    "category": "Watch",
    "brand": "Samsung",
    "variants": [
      { "color": "Graphite", "image": watchImage },
      { "color": "Gold", "image": watchImage }
    ],
    "price": 18500,
    "discount": 5,
    "isNew": true,
    "rating": 4.5,
    "reviewsCount": 75,
    "isFavorite": true,
    "description": "AMOLED smartwatch with health tracking features."
  },
  {
    "id": 7,
    "name": "AirPods Pro 2",
    "category": "Earphones",
    "brand": "Apple",
    "variants": [
      { "color": "White", "image": airpodsImage }
    ],
    "price": 10500,
    "discount": 8,
    "isNew": false,
    "rating": 4.8,
    "reviewsCount": 240,
    "isFavorite": false,
    "description": "Noise-cancelling wireless earbuds with MagSafe case."
  },
  {
    "id": 8,
    "name": "Samsung Galaxy Buds2 Pro",
    "category": "Earphones",
    "brand": "Samsung",
    "variants": [
      { "color": "Bora Purple", "image": airpodsImage },
      { "color": "Graphite", "image": airpodsImage }
    ],
    "price": 9500,
    "discount": 10,
    "isNew": true,
    "rating": 4.4,
    "reviewsCount": 118,
    "isFavorite": true,
    "description": "Hi-Fi sound earbuds with ANC and wireless charging."
  },
  {
    "id": 9,
    "name": "Sony WH-1000XM5",
    "category": "Headphones",
    "brand": "Sony",
    "variants": [
      { "color": "Black", "image": airpodsImage },
      { "color": "Silver", "image": airpodsImage }
    ],
    "price": 17500,
    "discount": 15,
    "isNew": false,
    "rating": 4.9,
    "reviewsCount": 350,
    "isFavorite": false,
    "description": "Industry-leading noise-cancelling over-ear headphones."
  },
  {
    "id": 10,
    "name": "Anker PowerPort III Nano",
    "category": "Charger",
    "brand": "Anker",
    "variants": [
      { "color": "White", "image": chargersImage },
      { "color": "Blue", "image": chargersImage }
    ],
    "price": 850,
    "discount": 0,
    "isNew": true,
    "rating": 4.3,
    "reviewsCount": 45,
    "isFavorite": true,
    "description": "Compact 20W fast USB-C charger."
  },
  {
    "id": 11,
    "name": "Apple 35W Dual USB-C Charger",
    "category": "Charger",
    "brand": "Apple",
    "variants": [
      { "color": "White", "image": chargersImage }
    ],
    "price": 2700,
    "discount": 12,
    "isNew": false,
    "rating": 4.5,
    "reviewsCount": 63,
    "isFavorite": false,
    "description": "Dual USB-C ports for simultaneous charging."
  },
  {
    "id": 12,
    "name": "Baseus GaN 65W Charger",
    "category": "Charger",
    "brand": "Baseus",
    "variants": [
      { "color": "Black", "image": chargersImage },
      { "color": "White", "image": chargersImage }
    ],
    "price": 1450,
    "discount": 10,
    "isNew": true,
    "rating": 4.6,
    "reviewsCount": 56,
    "isFavorite": false,
    "description": "GaN fast charger suitable for laptops and phones."
  },
  {
    "id": 13,
    "name": "Apple MagSafe Case",
    "category": "Accessory",
    "brand": "Apple",
    "variants": [
      { "color": "Midnight", "image": product1Image },
      { "color": "Red", "image": product2Image }
    ],
    "price": 1800,
    "discount": 0,
    "isNew": false,
    "rating": 4.2,
    "reviewsCount": 22,
    "isFavorite": true,
    "description": "Leather case with MagSafe compatibility."
  },
  {
    "id": 14,
    "name": "Spigen Ultra Hybrid Case",
    "category": "Accessory",
    "brand": "Spigen",
    "variants": [
      { "color": "Clear", "image": product1Image },
      { "color": "Matte Black", "image": product2Image }
    ],
    "price": 900,
    "discount": 5,
    "isNew": true,
    "rating": 4.5,
    "reviewsCount": 44,
    "isFavorite": false,
    "description": "Shock-absorbent clear phone case."
  },
  {
    "id": 15,
    "name": "JBL Flip 6",
    "category": "Speaker",
    "brand": "JBL",
    "variants": [
      { "color": "Black", "image": airpodsImage },
      { "color": "Red", "image": airpodsImage }
    ],
    "price": 3400,
    "discount": 8,
    "isNew": false,
    "rating": 4.7,
    "reviewsCount": 70,
    "isFavorite": false,
    "description": "Portable Bluetooth speaker with 12h playtime."
  },
  {
    "id": 16,
    "name": "Anker Soundcore Mini 3",
    "category": "Speaker",
    "brand": "Anker",
    "variants": [
      { "color": "Black", "image": airpodsImage },
      { "color": "Blue", "image": airpodsImage }
    ],
    "price": 1200,
    "discount": 6,
    "isNew": true,
    "rating": 4.4,
    "reviewsCount": 51,
    "isFavorite": false,
    "description": "Mini waterproof wireless speaker."
  },
  {
    "id": 17,
    "name": "Logitech MX Master 3S",
    "category": "Accessory",
    "brand": "Logitech",
    "variants": [
      { "color": "Graphite", "image": airpodsImage },
      { "color": "Pale Gray", "image": airpodsImage }
    ],
    "price": 3300,
    "discount": 4,
    "isNew": false,
    "rating": 4.8,
    "reviewsCount": 98,
    "isFavorite": true,
    "description": "Ergonomic wireless mouse for productivity."
  },
  {
    "id": 18,
    "name": "Samsung Galaxy Tab S9",
    "category": "Tablet",
    "brand": "Samsung",
    "variants": [
      { "color": "Graphite", "image": laptopImage },
      { "color": "Lavender", "image": laptopImage }
    ],
    "price": 39000,
    "discount": 9,
    "isNew": true,
    "rating": 4.7,
    "reviewsCount": 133,
    "isFavorite": false,
    "description": "High-end Android tablet with AMOLED display."
  },
  {
    "id": 19,
    "name": "OnePlus 12",
    "category": "Phone",
    "brand": "OnePlus",
    "variants": [
      { "color": "Lunar Silver", "image": iphoneImage },
      { "color": "Titan Black", "image": airImage }
    ],
    "price": 45000,
    "discount": 10,
    "isNew": false,
    "rating": 4.6,
    "reviewsCount": 89,
    "isFavorite": true,
    "description": "Flagship OnePlus smartphone with Snapdragon 8 Gen 3."
  },
  {
    "id": 20,
    "name": "Sony WF-1000XM5",
    "category": "Earphones",
    "brand": "Sony",
    "variants": [
      { "color": "Black", "image": airpodsImage }
    ],
    "price": 9200,
    "discount": 5,
    "isNew": true,
    "rating": 4.8,
    "reviewsCount": 102,
    "isFavorite": false,
    "description": "True wireless noise-cancelling earbuds."
  }
];