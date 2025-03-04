// lib/stores/cart-store.ts
import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

type CartStore = {
  cart: Product[];
  notification: boolean;
  notificationMessage: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  showNotification: (message: string) => void;
  hideNotification: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  notification: false,
  notificationMessage: '',
  addToCart: (product) => {
    const message = `${product.name} added to cart!`;
    set((state) => ({
      cart: [...state.cart, product],
      notification: true,
      notificationMessage: message,
    }));
  },
  removeFromCart: (productId) =>
    set((state) => ({ cart: state.cart.filter(item => item.id !== productId) })),
  clearCart: () => set({ cart: [] }),
  showNotification: (message) => set({ notification: true, notificationMessage: message }),
  hideNotification: () => set({ notification: false, notificationMessage: '' }),
}));