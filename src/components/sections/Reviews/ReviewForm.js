import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Input from '../../common/Form/Input';
import Button from '../../common/Button/Button';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xlarge};
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.colors.gray};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Rating = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.gray};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

function ReviewForm({ onSubmit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('reviews.errors.nameRequired');
    if (!formData.email) newErrors.email = t('reviews.errors.emailRequired');
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('reviews.errors.emailInvalid');
    if (!formData.rating) newErrors.rating = t('reviews.errors.ratingRequired');
    if (!formData.comment) newErrors.comment = t('reviews.errors.commentRequired');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setFormData({ name: '', email: '', rating: 0, comment: '' });
      } catch (error) {
        setErrors({ submit: t('reviews.errors.submitFailed') });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label={t('reviews.form.name')}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        type="email"
        label={t('reviews.form.email')}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Rating>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton
            key={star}
            type="button"
            active={star <= formData.rating}
            onClick={() => setFormData({ ...formData, rating: star })}
          >
            ★
          </StarButton>
        ))}
        {errors.rating && <div style={{ color: 'red' }}>{errors.rating}</div>}
      </Rating>
      <TextArea
        placeholder={t('reviews.form.commentPlaceholder')}
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        error={errors.comment}
      />
      {errors.comment && <div style={{ color: 'red' }}>{errors.comment}</div>}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="large"
        style={{ width: '100%' }}
      >
        {isSubmitting ? t('reviews.form.submitting') : t('reviews.form.submit')}
      </Button>
      {errors.submit && <div style={{ color: 'red', marginTop: '10px' }}>{errors.submit}</div>}
    </Form>
  );
}

export default ReviewForm; 