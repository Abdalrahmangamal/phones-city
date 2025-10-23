import { useCart } from "@/store/cart";
import { productsData } from "@/data/products";

// Function to add sample products to cart
export const addSampleProductsToCart = () => {
  const { items, add } = useCart.getState();
  
  // Check if we already have sample products in the cart
  const hasSampleProducts = items.some(item => 
    item.id.startsWith('product-1-') || item.id.startsWith('product-3-')
  );
  
  // If we don't have sample products, add them
  if (!hasSampleProducts) {
    // Add first product (MacBook)
    const macBook = productsData[0];
    add({
      id: `product-${macBook.id}-0`,
      name: macBook.name,
      price: macBook.price,
      qty: 1,
      image: macBook.variants[0].image,
      productId: macBook.id
    });
    
    // Add second product (iPhone)
    const iPhone = productsData[2];
    add({
      id: `product-${iPhone.id}-0`,
      name: iPhone.name,
      price: iPhone.price,
      qty: 2,
      image: iPhone.variants[0].image,
      productId: iPhone.id
    });
  }
};