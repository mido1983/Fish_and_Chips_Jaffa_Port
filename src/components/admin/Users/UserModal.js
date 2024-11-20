import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Form/Input';
import Select from '../../common/Form/Select';
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

function UserModal({ user, onSave, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('admin.users.errors.nameRequired');
    if (!formData.email) newErrors.email = t('admin.users.errors.emailRequired');
    if (!user && !formData.password) newErrors.password = t('admin.users.errors.passwordRequired');
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
        const method = user ? 'PUT' : 'POST';
        const url = user 
          ? `/api/admin/users/${user.id}`
          : '/api/admin/users';

        await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        onSave();
        onClose();
      } catch (error) {
        console.error('Error saving user:', error);
        setErrors({ submit: t('admin.users.errors.submitFailed') });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal
      title={user ? t('admin.users.editUser') : t('admin.users.addUser')}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          label={t('admin.users.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label={t('admin.users.email')}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <Select
          label={t('admin.users.role')}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          options={[
            { value: 'user', label: t('admin.users.roles.user') },
            { value: 'manager', label: t('admin.users.roles.manager') },
            { value: 'admin', label: t('admin.users.roles.admin') },
          ]}
        />
        {!user && (
          <>
            <Input
              label={t('admin.users.password')}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <Input
              label={t('admin.users.confirmPassword')}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />
          </>
        )}
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

export default UserModal; 