import React from 'react';
import styled from 'styled-components';

const GalleryWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

function GalleryPage() {
  return (
    <GalleryWrapper>
      <h1>Gallery</h1>
      {/* Add gallery content here */}
    </GalleryWrapper>
  );
}

export default GalleryPage; 