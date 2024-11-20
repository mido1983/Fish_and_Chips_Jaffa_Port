import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { reviewsService } from '../../../services/api';

const ReviewsWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.primary};
`;

function ReviewsSection() {
  const { t } = useTranslation();
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchReviews = async () => {
    try {
      const response = await reviewsService.getReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReviews();
  }, []);

  const handleNewReview = async (reviewData) => {
    try {
      await reviewsService.submitReview(reviewData);
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  return (
    <ReviewsWrapper>
      <Title>{t('reviews.title')}</Title>
      <ReviewForm onSubmit={handleNewReview} />
      <ReviewList reviews={reviews} loading={loading} />
    </ReviewsWrapper>
  );
}

export default ReviewsSection; 