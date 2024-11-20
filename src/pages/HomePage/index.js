import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

function HomePage() {
  return (
    <HomeWrapper>
      <h1>Welcome to Fish & Chips Jaffa Port</h1>
      {/* Add your home page content here */}
    </HomeWrapper>
  );
}

export default HomePage; 