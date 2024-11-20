import React from 'react';
import styled from 'styled-components';

const ReviewsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

function ReviewsPage() {
  return (
    <ReviewsWrapper>
      <h1>Reviews</h1>
      {/* Add reviews content here */}
    </ReviewsWrapper>
  );
}

export default ReviewsPage; 