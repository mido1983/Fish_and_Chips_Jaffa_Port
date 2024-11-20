import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes, FaTrash, FaStar } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import { formatDistanceToNow } from 'date-fns';

const ReviewsWrapper = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ReviewCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: start;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const ReviewerInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  span {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  gap: 2px;
`;

const Status = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${({ approved, theme }) => 
    approved ? theme.colors.success + '22' : theme.colors.error + '22'};
  color: ${({ approved, theme }) => 
    approved ? theme.colors.success : theme.colors.error};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

function ReviewManagement() {
  const { t } = useTranslation();
  const [reviews, setReviews] = React.useState([]);
  const [selectedReview, setSelectedReview] = React.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (review, approved) => {
    try {
      await fetch(`/api/admin/reviews/${review.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved }),
      });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review approval:', error);
    }
  };

  const handleDelete = async (review) => {
    try {
      await fetch(`/api/admin/reviews/${review.id}`, {
        method: 'DELETE',
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ReviewsWrapper>
      <Header>
        <h2>{t('admin.reviews.title')}</h2>
      </Header>

      <ReviewsList>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <ReviewContent>
              <ReviewHeader>
                <ReviewerInfo>
                  <h3>{review.name}</h3>
                  <span>
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                  </span>
                </ReviewerInfo>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < review.rating ? '#FFB800' : '#DDD'} />
                  ))}
                </Rating>
              </ReviewHeader>
              <p>{review.comment}</p>
              <Status approved={review.approved}>
                {review.approved ? t('admin.reviews.approved') : t('admin.reviews.pending')}
              </Status>
            </ReviewContent>
            <Actions>
              {!review.approved && (
                <Button
                  variant="success"
                  onClick={() => handleApproval(review, true)}
                >
                  <FaCheck />
                </Button>
              )}
              {review.approved && (
                <Button
                  variant="warning"
                  onClick={() => handleApproval(review, false)}
                >
                  <FaTimes />
                </Button>
              )}
              <Button
                variant="error"
                onClick={() => {
                  setSelectedReview(review);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </Button>
            </Actions>
          </ReviewCard>
        ))}
      </ReviewsList>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          title={t('admin.reviews.deleteTitle')}
          message={t('admin.reviews.deleteMessage')}
          onConfirm={() => {
            handleDelete(selectedReview);
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </ReviewsWrapper>
  );
}

export default ReviewManagement; 