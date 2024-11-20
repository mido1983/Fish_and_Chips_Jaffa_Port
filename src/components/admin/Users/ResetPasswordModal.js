import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Form/Input';
import Button from '../../common/Button/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const Message = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textLight};
`;

function ResetPasswordModal({ user, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = t('admin.users.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('admin.users.errors.passwordLength');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('admin.users.errors.passwordMismatch');
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await fetch(`/api/admin/users/${user.id}/reset-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: formData.password }),
        });
        onClose();
      } catch (error) {
        console.error('Error resetting password:', error);
        setErrors({ submit: t('admin.users.errors.resetFailed') });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal
      title={t('admin.users.resetPassword')}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Message>
          {t('admin.users.resetPasswordMessage', { name: user.name })}
        </Message>
        <Input
          label={t('admin.users.newPassword')}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
        />
        <Input
          label={t('admin.users.confirmNewPassword')}
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />
        {errors.submit && (
          <div style={{ color: 'red' }}>{errors.submit}</div>
        )}
        <ButtonGroup>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('common.saving') : t('common.save')}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
}

export default ResetPasswordModal; 