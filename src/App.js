import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/Menu';
import GalleryPage from './pages/Gallery';
import ReviewsPage from './pages/Reviews';
import ContactPage from './pages/Contact';
import { createApiInstance } from './services/api/config';
import DirectionProvider from './components/DirectionProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  const navigate = useNavigate();
  
  // Initialize API instance with navigation
  const api = createApiInstance(navigate);

  return (
    <ThemeProvider theme={theme}>
      <DirectionProvider>
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </div>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default App; 