import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/Menu';
import GalleryPage from './pages/Gallery';
import ReviewsPage from './pages/Reviews';
import ContactPage from './pages/Contact';
import { createApiInstance } from './services/api/config';

function App() {
  const navigate = useNavigate();
  
  // Initialize API instance with navigation
  const api = createApiInstance(navigate);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App; 