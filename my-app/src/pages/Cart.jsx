import React from 'react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { vnd } from '../utils/format';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, total, itemCount } = useCart();
  const nav = useNavigate();
  return (
    <div className="cart-content">
      <div className="cart-header">
        <h2>Giỏ hàng</h2>
        <div id="item-count">{itemCount} sản phẩm</div>
      </div>
      <div id="cart-items">
        {items.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <p>Giỏ hàng trống</p>
          </div>
        ) : items.map(it => <CartItem key={it.novel.id} item={it} />)}
      </div>
      <div className="cart-footer">
        <div className="cart-total">Tổng: <span id="cart-total">{vnd(total)}</span></div>
        <button id="checkout-btn" onClick={()=>nav('/checkout')}>Thanh toán</button>
      </div>
    </div>
  );
}
