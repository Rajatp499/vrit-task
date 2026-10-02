// lib/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface CartItem {
  _id: number;
  items_no: number;
}

interface CartState {
  cart: CartItem[];
  addItem: (_id: number, no_items?: number) => void;
  removeItem: (_id: number, no_items?: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addItem: (_id, no_items = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === _id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item._id === _id
                  ? { ...item, items_no: item.items_no + Number(no_items) }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { _id, items_no: no_items }] };
        }),

      removeItem: (_id, no_items) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === _id);
          if (existing && existing.items_no === 0)
            return {
              cart: state.cart,
            };
          else {
            return {
              cart: state.cart.map((item) =>
                item._id === _id
                  ? { ...item, items_no: item.items_no - Number(no_items) }
                  : item,
              ),
            };
          }
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
