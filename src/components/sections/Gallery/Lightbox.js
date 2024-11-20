import React from 'react';
import styled from 'styled-components';
import OptimizedImage from '../../common/Image/OptimizedImage';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const Description = styled.p`
  color: white;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

function Lightbox({ image, onClose }) {
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <ImageContainer onClick={(e) => e.stopPropagation()}>
        <OptimizedImage
          src={image.url}
          alt={image.description}
          objectFit="contain"
        />
        {image.description && (
          <Description>{image.description}</Description>
        )}
      </ImageContainer>
    </Overlay>
  );
}

export default Lightbox; 