import React from 'react';
import { useCart } from '../context/CartContext';
import { vnd } from '../utils/format';
import { saveOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { isValidPhoneVN10 } from '../utils/validators';

export default function Checkout() {
  const { items, clear } = useCart();
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value.trim();
    const phone = e.target.phone.value.trim();
    const address = e.target.address.value.trim();
    if (!fullName || !phone || !address) return alert('Vui lòng điền đầy đủ thông tin!');
    if (!isValidPhoneVN10(phone)) return alert('Số điện thoại phải có 10 chữ số!');

    const checkoutCart = items.flatMap(it => Array(it.quantity).fill(it.novel.id));
    try {
      saveOrder(fullName, phone, address, checkoutCart);
      clear();
      nav('/success');
    } catch (err) {
      alert(err.message || 'Có lỗi khi lưu đơn hàng!');
    }
  };

  return (
    <div className="checkout-content">
      <h2>Thông tin thanh toán</h2>
      <form id="checkoutForm" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Họ và tên:</label>
          <input name="fullName" required />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input name="phone" required />
        </div>
        <div className="form-group">
          <label>Truyện trong giỏ hàng:</label>
          <div id="checkout-items">
            {items.map(it => (
              <div key={it.novel.id} className="checkout-item">
                <span>{it.novel.title}</span>
                <span>Số lượng: {it.quantity}</span>
                <span>{vnd(it.novel.price * it.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Địa chỉ giao hàng:</label>
          <textarea name="address" required />
        </div>
        <button type="submit">Xác nhận thanh toán</button>
      </form>
    </div>
  );
}
