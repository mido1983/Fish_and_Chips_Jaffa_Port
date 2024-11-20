import React from 'react';
import styled from 'styled-components';
import GalleryGrid from './GalleryGrid';
import Lightbox from './Lightbox';

const GalleryWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
`;

function GallerySection() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call to fetch images
    const fetchImages = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <GalleryWrapper>
      <GalleryGrid 
        images={images} 
        onImageClick={setSelectedImage} 
        loading={loading}
      />
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </GalleryWrapper>
  );
}

export default GallerySection; 