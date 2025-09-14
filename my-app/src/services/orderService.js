import { getJSON, setJSON } from './storage';
import { novels } from './novels';

export function saveOrder(fullName, phone, address, checkoutCart) {
  if (!Array.isArray(checkoutCart) || checkoutCart.length === 0) {
    throw new Error("Giỏ hàng không hợp lệ");
  }
  const cartCount = {};
  checkoutCart.forEach(id => {
    cartCount[id] = (cartCount[id] || 0) + 1;
  });

  let total = 0;
  const items = Object.entries(cartCount).map(([id, quantity]) => {
    const n = novels.find(x => x.id == id);
    if (!n) return null;
    total += n.price * quantity;
    return { id: Number(id), name: n.title, quantity, price: n.price };
  }).filter(Boolean);

  if (items.length === 0) throw new Error("Không có sản phẩm hợp lệ");

  const order = {
    date: new Date().toLocaleString('vi-VN'),
    customer: { name: fullName, phone, address },
    items,
    total
  };

  const history = getJSON('orderHistory', []);
  history.push(order);
  setJSON('orderHistory', history);
  return order;
}

export function getOrderHistory() {
  return getJSON('orderHistory', []);
}
