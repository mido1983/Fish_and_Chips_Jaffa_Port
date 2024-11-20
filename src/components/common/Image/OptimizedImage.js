import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  ${({ hover }) => hover && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function OptimizedImage({
  src,
  alt,
  width,
  height,
  objectFit,
  borderRadius,
  hover = false,
  quality = 75,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && src) {
      // Check if browser supports WebP
      const supportsWebP = async () => {
        if (!self.createImageBitmap) return false;
        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webpData).then(r => r.blob());
        return createImageBitmap(blob).then(() => true, () => false);
      };

      // Generate optimized image URL
      const generateOptimizedUrl = async () => {
        const hasWebP = await supportsWebP();
        const baseUrl = process.env.REACT_APP_IMAGE_OPTIMIZATION_URL || '';
        
        // Construct URL with optimization parameters
        const params = new URLSearchParams({
          url: src,
          w: width || 'auto',
          q: quality,
          format: hasWebP ? 'webp' : 'jpeg'
        });

        return `${baseUrl}?${params.toString()}`;
      };

      generateOptimizedUrl().then(setImageSrc);
    }
  }, [inView, src, width, quality]);

  return (
    <ImageWrapper
      ref={ref}
      height={height}
      borderRadius={borderRadius}
    >
      {!isLoaded && <Placeholder />}
      {inView && imageSrc && (
        <StyledImage
          src={imageSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          isLoaded={isLoaded}
          objectFit={objectFit}
          hover={hover}
          {...props}
        />
      )}
    </ImageWrapper>
  );
}

export default OptimizedImage; 