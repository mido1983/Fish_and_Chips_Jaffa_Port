import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Form/Input';
import Button from '../../common/Button/Button';
import ImageUpload from '../../common/Form/ImageUpload';

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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.gray};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

function MenuItemModal({ item, onSave, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    name: item?.name || '',
    nameHe: item?.nameHe || '',
    description: item?.description || '',
    descriptionHe: item?.descriptionHe || '',
    category: item?.category || '',
    price: item?.price || '',
    image: item?.image || '',
    isAvailable: item?.isAvailable ?? true,
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('admin.menu.errors.nameRequired');
    if (!formData.nameHe) newErrors.nameHe = t('admin.menu.errors.nameHeRequired');
    if (!formData.category) newErrors.category = t('admin.menu.errors.categoryRequired');
    if (!formData.price) newErrors.price = t('admin.menu.errors.priceRequired');
    if (isNaN(formData.price)) newErrors.price = t('admin.menu.errors.priceInvalid');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSave({
          ...formData,
          id: item?.id,
          price: parseFloat(formData.price),
        });
      } catch (error) {
        setErrors({ submit: t('admin.menu.errors.submitFailed') });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Modal
      title={item ? t('admin.menu.editItem') : t('admin.menu.addItem')}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          label={t('admin.menu.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label={t('admin.menu.nameHe')}
          value={formData.nameHe}
          onChange={(e) => setFormData({ ...formData, nameHe: e.target.value })}
          error={errors.nameHe}
        />
        <Input
          label={t('admin.menu.description')}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
        />
        <Input
          label={t('admin.menu.descriptionHe')}
          value={formData.descriptionHe}
          onChange={(e) => setFormData({ ...formData, descriptionHe: e.target.value })}
          multiline
        />
        <Select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          error={errors.category}
        >
          <option value="">{t('admin.menu.selectCategory')}</option>
          <option value="fish">{t('admin.menu.categories.fish')}</option>
          <option value="sides">{t('admin.menu.categories.sides')}</option>
          <option value="drinks">{t('admin.menu.categories.drinks')}</option>
        </Select>
        <Input
          label={t('admin.menu.price')}
          type="number"
          step="0.1"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          error={errors.price}
        />
        <ImageUpload
          currentImage={formData.image}
          onUpload={handleImageUpload}
          label={t('admin.menu.image')}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.isAvailable}
            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
          />
          {t('admin.menu.available')}
        </label>
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

export default MenuItemModal; 