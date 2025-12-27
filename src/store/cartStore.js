import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],

  addToCart: (item) =>
    set((s) => {
      const exists = s.cart.find(p => p._id === item._id);
      if (exists) {
        return {
          cart: s.cart.map(p =>
            p._id === item._id
              ? { ...p, quantity: (p.quantity || 1) + 1 }
              : p
          )
        };
      }
      return { cart: [...s.cart, { ...item, quantity: 1 }] };
    }),

  increaseQty: (id) =>
    set(s => ({
      cart: s.cart.map(p => p._id === id ? { ...p, quantity:p.quantity+1 } : p)
    })),

  decreaseQty: (id) =>
    set(s => ({
      cart: s.cart.map(p => p._id === id && p.quantity>1 ? { ...p, quantity:p.quantity-1 } : p)
    })),

  removeFromCart: (id) =>
    set(s => ({ cart: s.cart.filter(p=>p._id!==id) })),

  clearCart: () => set({ cart: [] }),

  drawerOpen:false,
  toggleCart: () => set(s => ({drawerOpen:!s.drawerOpen}))
}));
