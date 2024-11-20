import React from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

function ContactPage() {
  return (
    <ContactWrapper>
      <h1>Contact Us</h1>
      {/* Add contact content here */}
    </ContactWrapper>
  );
}

export default ContactPage; 