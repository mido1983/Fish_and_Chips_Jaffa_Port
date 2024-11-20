import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function SEO({ 
  title, 
  description, 
  image, 
  schema 
}) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const currentUrl = `${baseUrl}${location.pathname}`;
  const defaultImage = `${baseUrl}/images/restaurant-default.jpg`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Fish & Chips Jaffa Port",
    "image": defaultImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jaffa Port",
      "addressLocality": "Tel Aviv-Yafo",
      "addressRegion": "Tel Aviv District",
      "postalCode": "12345",
      "addressCountry": "IL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.0523,
      "longitude": 34.7516
    },
    "url": baseUrl,
    "telephone": "+972-3-123-4567",
    "servesCuisine": "Seafood",
    "priceRange": "$$",
    "openingHours": [
      "Mo-Th 11:00-22:00",
      "Fr 11:00-16:00",
      "Sa Closed",
      "Su 11:00-22:00"
    ]
  };

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{title ? `${title} | Fish & Chips Jaffa Port` : 'Fish & Chips Jaffa Port'}</title>
      <meta name="description" content={description || t('seo.defaultDescription')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title || 'Fish & Chips Jaffa Port'} />
      <meta property="og:description" content={description || t('seo.defaultDescription')} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title || 'Fish & Chips Jaffa Port'} />
      <meta name="twitter:description" content={description || t('seo.defaultDescription')} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Alternate Language Links */}
      {['en', 'he', 'ru', 'ar'].map((lang) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={`${baseUrl}/${lang}${location.pathname}`}
        />
      ))}

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}

export default SEO; 