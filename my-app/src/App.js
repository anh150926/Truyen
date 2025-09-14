import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NovelDetail from './pages/NovelDetail';
import ReadChapter from './pages/ReadChapter';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/style.css';
import './styles/responsive.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/novel/:id" element={<NovelDetail />} />
              <Route path="/read/:novelId/:chapterIndex" element={<ReadChapter />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
