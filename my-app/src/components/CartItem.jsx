import React from 'react';
import { vnd } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { inc, dec, removeAllOf } = useCart();
  const { novel, quantity } = item;
  return (
    <div className="cart-item">
      <div className="cart-item-img"><img src={novel.image} alt={novel.title} /></div>
      <div className="cart-item-info">
        <h3>{novel.title}</h3>
        <p>{vnd(novel.price)}</p>
      </div>
      <div className="cart-item-quantity">
        <button className="quantity-btn minus" onClick={() => dec(novel.id)}>-</button>
        <span className="quantity">{quantity}</span>
        <button className="quantity-btn plus" onClick={() => inc(novel.id)}>+</button>
      </div>
      <div className="cart-item-total">{vnd(novel.price * quantity)}</div>
      <button className="remove-btn" onClick={() => removeAllOf(novel.id)}>Xóa</button>
    </div>
  );
}
