import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Input from '../../common/Form/Input';
import Button from '../../common/Button/Button';
import { contactService } from '../../../services/api';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
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

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
  background-color: #e6ffe6;
  border-radius: 4px;
`;

function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('contact.errors.nameRequired');
    if (!formData.email) newErrors.email = t('contact.errors.emailRequired');
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.errors.emailInvalid');
    if (!formData.message) newErrors.message = t('contact.errors.messageRequired');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await contactService.submitContact(formData);
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } catch (error) {
        setErrors({ submit: t('contact.errors.submitFailed') });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          label={t('contact.form.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label={t('contact.form.phone')}
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          label={t('contact.form.email')}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <TextArea
          placeholder={t('contact.form.messagePlaceholder')}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={errors.message}
        />
        {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="large"
          style={{ width: '100%' }}
        >
          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </Button>
        {errors.submit && <div style={{ color: 'red', marginTop: '10px' }}>{errors.submit}</div>}
      </Form>
      {success && (
        <SuccessMessage>{t('contact.form.success')}</SuccessMessage>
      )}
    </FormWrapper>
  );
}

export default ContactForm; 