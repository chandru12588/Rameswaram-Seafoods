import { create } from "zustand";

const qtyStep = (item) => (String(item?.unit || "").toLowerCase() === "kg" ? 0.5 : 1);
const minQty = (item) => {
  if (item?.minOrderQty && Number(item.minOrderQty) > 0) {
    return Number(item.minOrderQty);
  }
  return String(item?.unit || "kg").toLowerCase() === "kg" ? 0.5 : 1;
};
const roundQty = (value) => Number(value.toFixed(2));

export const useCart = create((set) => ({
  cart: [],

  addToCart: (item) =>
    set((s) => {
      const exists = s.cart.find(p => p._id === item._id);
      const addedQty = roundQty(Number(item.quantity ?? qtyStep(item)));
      if (exists) {
        const step = qtyStep(exists);
        return {
          cart: s.cart.map(p =>
            p._id === item._id
              ? { ...p, quantity: roundQty((p.quantity || minQty(p)) + (item.quantity ? addedQty : step)) }
              : p
          )
        };
      }
      return { cart: [...s.cart, { ...item, quantity: addedQty }] };
    }),

  increaseQty: (id) =>
    set(s => ({
      cart: s.cart.map(p => p._id === id ? { ...p, quantity: roundQty((p.quantity || minQty(p)) + qtyStep(p)) } : p)
    })),

  decreaseQty: (id) =>
    set(s => ({
      cart: s.cart.map(p => {
        if (p._id !== id) return p;
        const next = roundQty((p.quantity || minQty(p)) - qtyStep(p));
        return next >= minQty(p) ? { ...p, quantity: next } : p;
      })
    })),

  removeFromCart: (id) =>
    set(s => ({ cart: s.cart.filter(p=>p._id!==id) })),

  clearCart: () => set({ cart: [] }),

  drawerOpen:false,
  toggleCart: () => set(s => ({drawerOpen:!s.drawerOpen}))
}));
