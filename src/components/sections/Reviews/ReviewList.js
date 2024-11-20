import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const ReviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ReviewerName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
`;

const ReviewDate = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const ReviewComment = styled.p`
  margin: 0;
  line-height: 1.5;
`;

function ReviewList({ reviews, loading }) {
  const { t } = useTranslation();

  if (loading) {
    return <div>{t('reviews.loading')}</div>;
  }

  if (!reviews.length) {
    return <div>{t('reviews.noReviews')}</div>;
  }

  return (
    <ReviewsGrid>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <ReviewHeader>
            <ReviewerName>{review.name}</ReviewerName>
            <Rating>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Rating>
          </ReviewHeader>
          <ReviewDate>
            {new Date(review.createdAt).toLocaleDateString()}
          </ReviewDate>
          <ReviewComment>{review.comment}</ReviewComment>
        </ReviewCard>
      ))}
    </ReviewsGrid>
  );
}

export default ReviewList; 