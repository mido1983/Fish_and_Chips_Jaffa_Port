import React from 'react';
import styled from 'styled-components';

const SocialLinksWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function SocialLinks() {
  return (
    <SocialLinksWrapper>
      <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        Facebook
      </SocialLink>
      <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        Instagram
      </SocialLink>
    </SocialLinksWrapper>
  );
}

export default SocialLinks; 