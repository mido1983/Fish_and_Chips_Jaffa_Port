import React from 'react';
import styled from 'styled-components';
import OptimizedImage from '../../common/Image/OptimizedImage';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

function GalleryGrid({ images, onImageClick, loading }) {
  if (loading) return <div>Loading...</div>;

  return (
    <Grid>
      {images.map((image) => (
        <ImageContainer 
          key={image.id} 
          onClick={() => onImageClick(image)}
        >
          <OptimizedImage
            src={image.url}
            alt={image.description}
            hover
          />
        </ImageContainer>
      ))}
    </Grid>
  );
}

export default GalleryGrid; 