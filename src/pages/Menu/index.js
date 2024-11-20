import React from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

function MenuPage() {
  return (
    <MenuWrapper>
      <h1>Our Menu</h1>
      {/* Add menu content here */}
    </MenuWrapper>
  );
}

export default MenuPage; 