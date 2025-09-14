import React from 'react';
import { getOrderHistory } from '../services/orderService';
import { vnd } from '../utils/format';

export default function OrderHistory() {
  const history = (getOrderHistory() || []).slice().reverse();

  return (
    <div className="order-history-content">
      <h2>Lịch sử mua hàng</h2>
      <div id="orderHistory">
        {history.length === 0 ? <p>Bạn chưa có đơn hàng nào.</p> : history.map((order, idx) => (
          <div className="order-card" key={idx}>
            <div className="order-date">Ngày đặt: {order.date || 'Không xác định'}</div>
            <div className="order-customer">
              <span>Khách: {order.customer?.name || 'Không có'}</span> | 
              <span>ĐT: {order.customer?.phone || 'Không có'}</span> | 
              <span>Địa chỉ: {order.customer?.address || 'Không có'}</span>
            </div>
            <ul className="order-items">
              {(order.items||[]).map((it, i) => (
                <li key={i}><strong>{it.name}</strong> (x{it.quantity}) - {vnd(it.price * it.quantity)}</li>
              ))}
            </ul>
            <div className="order-total">Tổng cộng: {vnd(order.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

