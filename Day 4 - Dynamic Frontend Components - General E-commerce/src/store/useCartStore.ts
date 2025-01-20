// // Define interfaces for your store types
// import {create} from 'zustand'
// interface Product {
//     id: string | number;
//     price: number;
//     color: string;
//     size: string;
//     quantity?: number;
//     name?:string;
//     imageUrl?:string
//     // Add other product properties as needed
//   }
  
//   interface CartItem extends Product {
//     quantity: number;
//   }
  
//   interface CartStore {
//     cart: CartItem[];
//     totalQuantity: number;
//     totalPrice: number;
//     addToCart: (product: Product, quantity: number) => void;
//     removeFromCart: (productId: string | number, color: string, size: string) => void;
//     updateQuantity: (productId: string | number, color: string, size: string, newQuantity: number) => void;
//     clearCart: () => void;
//   }
  
//   // Update the store with proper typing
//   const useCartStore = create<CartStore>((set, get) => ({
//     cart: [],
//     totalQuantity: 0,
//     totalPrice: 0,
  
//     addToCart: (product: Product, quantity:number) => {
//       const { cart } = get();
  
//       const existingProductIndex = cart.findIndex(
//         (item) => item.id === product.id && 
//                   item.color === product.color && 
//                   item.size === product.size
//       );
  
//       if (existingProductIndex > -1) {
//         const updatedCart = [...cart];
//         // updatedCart[existingProductIndex].quantity += 1;
        
//         set((state) => ({
//           cart: updatedCart,
//           totalQuantity: state.totalQuantity + quantity,
//           totalPrice: state.totalPrice + product.price,
//         }));
//       } else {
//         set((state) => ({
//           cart: [...state.cart, { ...product, quantity: 1 }],
//           totalQuantity: state.totalQuantity + quantity,
//           totalPrice: state.totalPrice + product.price,
//         }));
//       }
//     },
  
//     removeFromCart: (productId: string | number, color: string, size: string) => {
//       const { cart } = get();
//       const productIndex = cart.findIndex(
//         (item) => item.id === productId && 
//                   item.color === color && 
//                   item.size === size
//       );
  
//       if (productIndex > -1) {
//         const product = cart[productIndex];
        
//         set((state) => ({
//           cart: state.cart.filter((_, index) => index !== productIndex),
//           totalQuantity: state.totalQuantity - product.quantity,
//           totalPrice: state.totalPrice - (product.price * product.quantity),
//         }));
//       }
//     },
  
//     updateQuantity: (productId: string | number, color: string, size: string, newQuantity: number) => {
//       const { cart } = get();
//       const productIndex = cart.findIndex(
//         (item) => item.id === productId && 
//                   item.color === color && 
//                   item.size === size
//       );
  
//       if (productIndex > -1) {
//         const updatedCart = [...cart];
//         const product = cart[productIndex];
//         const quantityDifference = newQuantity - product.quantity;
        
//         updatedCart[productIndex].quantity = newQuantity;
  
//         set((state) => ({
//           cart: updatedCart,
//           totalQuantity: state.totalQuantity + quantityDifference,
//           totalPrice: state.totalPrice + (quantityDifference * product.price),
//         }));
//       }
//     },
  
//     clearCart: () => {
//       set({
//         cart: [],
//         totalQuantity: 0,
//         totalPrice: 0,
//       });
//     },
//   }));
  
//   export default useCartStore;
  

import { create } from 'zustand';

interface Product {
  id: string | number;
  price: number;
  color: string;
  size: string;
  quantity?: number;
  name?: string;
  imageUrl?: string;
}

interface CartItem extends Product {
  quantity: number; // Required for items in the cart
}

interface CartStore {
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string | number, color: string, size: string) => void;
  updateQuantity: (productId: string | number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,

  // Add a product to the cart
  addToCart: (product: Product, quantity: number) => {
    const { cart } = get();

    // Check if the product with the same color and size already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingProductIndex > -1) {
      // If the product exists, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;

      set((state) => ({
        cart: updatedCart,
        totalQuantity: state.totalQuantity + quantity,
        totalPrice: state.totalPrice + product.price * quantity,
      }));
    } else {
      // If the product does not exist, add it to the cart
      set((state) => ({
        cart: [...state.cart, { ...product, quantity }],
        totalQuantity: state.totalQuantity + quantity,
        totalPrice: state.totalPrice + product.price * quantity,
      }));
    }
  },

  // Remove a product from the cart
  removeFromCart: (productId: string | number, color: string, size: string) => {
    const { cart } = get();

    const productIndex = cart.findIndex(
      (item) =>
        item.id === productId &&
        item.color === color &&
        item.size === size
    );

    if (productIndex > -1) {
      const product = cart[productIndex];

      set((state) => ({
        cart: cart.filter((_, index) => index !== productIndex),
        totalQuantity: state.totalQuantity - product.quantity,
        totalPrice: state.totalPrice - product.price * product.quantity,
      }));
    }
  },

  // Update the quantity of a product in the cart
  updateQuantity: (productId: string | number, color: string, size: string, quantity: number) => {
    const { cart } = get();

    const productIndex = cart.findIndex(
      (item) =>
        item.id === productId &&
        item.color === color &&
        item.size === size
    );

    if (productIndex > -1) {
      const updatedCart = [...cart];
      const product = updatedCart[productIndex];
      const quantityDifference = quantity - product.quantity;

      updatedCart[productIndex].quantity = quantity;

      set((state) => ({
        cart: updatedCart,
        totalQuantity: state.totalQuantity + quantityDifference,
        totalPrice: state.totalPrice + quantityDifference * product.price,
      }));
    }
  },

  // Clear the entire cart
  clearCart: () => {
    set({
      cart: [],
      totalQuantity: 0,
      totalPrice: 0,
    });
  },
}));

export default useCartStore;
