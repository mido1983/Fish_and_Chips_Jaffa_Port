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

const Preview = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

function GalleryItemModal({ image, onSave, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    title: image?.title || '',
    description: image?.description || '',
    alt: image?.alt || '',
    url: image?.url || '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = image ? 'PUT' : 'POST';
      const url = image 
        ? `/api/admin/gallery/${image.id}`
        : '/api/admin/gallery';

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
      console.error('Error saving gallery item:', error);
      setErrors({ submit: t('admin.gallery.errors.submitFailed') });
    } finally {
      setIsSubmitting(false);
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
      setFormData(prev => ({ ...prev, url: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors({ image: t('admin.gallery.errors.uploadFailed') });
    }
  };

  return (
    <Modal
      title={image ? t('admin.gallery.editImage') : t('admin.gallery.addImage')}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <Input
          label={t('admin.gallery.title')}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Input
          label={t('admin.gallery.description')}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
        />
        <Input
          label={t('admin.gallery.alt')}
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
        />
        <ImageUpload
          currentImage={formData.url}
          onUpload={handleImageUpload}
          error={errors.image}
        />
        {formData.url && (
          <Preview>
            <img src={formData.url} alt={formData.alt} />
          </Preview>
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
            disabled={isSubmitting || !formData.url}
          >
            {isSubmitting ? t('common.saving') : t('common.save')}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
}

export default GalleryItemModal; 