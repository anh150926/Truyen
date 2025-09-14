import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getJSON, setJSON } from '../services/storage';
import { novels } from '../services/novels';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

/** Cart model: array of novelId numbers (duplicates = quantity), like original */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getJSON('cart', []));
  }, []);

  useEffect(() => {
    setJSON('cart', cart);
  }, [cart]);

  const add = (id) => setCart(prev => [...prev, id]);
  const removeAllOf = (id) => setCart(prev => prev.filter(x => x !== id));
  const inc = (id) => add(id);
  const dec = (id) => setCart(prev => {
    const idx = prev.findIndex(x => x === id);
    if (idx >= 0) {
      const clone = prev.slice();
      clone.splice(idx, 1);
      return clone;
    }
    return prev;
  });
  const clear = () => setCart([]);

  const cartMap = useMemo(() => {
    const m = {};
    cart.forEach(id => {
      m[id] = (m[id] || 0) + 1;
    });
    return m;
  }, [cart]);

  const items = useMemo(() => {
    return Object.entries(cartMap).map(([id, qty]) => {
      const n = novels.find(x => x.id === Number(id));
      return n ? { novel: n, quantity: qty } : null;
    }).filter(Boolean);
  }, [cartMap]);

  const total = useMemo(() => items.reduce((s, it) => s + it.novel.price * it.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ cart, add, inc, dec, removeAllOf, clear, items, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
