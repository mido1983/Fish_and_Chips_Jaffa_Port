import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaSave } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import Input from '../../common/Form/Input';
import ImageUpload from '../../common/Form/ImageUpload';
import Switch from '../../common/Form/Switch';
import { toast } from 'react-toastify';

const SettingsWrapper = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const Section = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: ${({ theme }) => theme.spacing.large};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const WorkingHours = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
`;

function SettingsManagement() {
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState({
    general: {
      siteName: '',
      siteDescription: '',
      logo: '',
      favicon: '',
      email: '',
      phone: '',
      address: '',
    },
    social: {
      facebook: '',
      instagram: '',
      tripadvisor: '',
    },
    hours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '16:00', closed: false },
      saturday: { open: '11:00', close: '22:00', closed: true },
      sunday: { open: '11:00', close: '22:00', closed: false },
    },
    features: {
      enableReviews: true,
      enableBooking: true,
      enableNewsletter: true,
      maintenanceMode: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error(t('admin.settings.errors.fetchFailed'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      toast.success(t('admin.settings.saveSuccess'));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(t('admin.settings.errors.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSettings(prev => ({
        ...prev,
        general: {
          ...prev.general,
          [type]: data.url,
        },
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(t('admin.settings.errors.uploadFailed'));
    }
  };

  return (
    <SettingsWrapper>
      <Header>
        <h2>{t('admin.settings.title')}</h2>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <FaSave />
          {isSubmitting ? t('common.saving') : t('common.save')}
        </Button>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Section>
          <h3>{t('admin.settings.general')}</h3>
          <Grid>
            <Input
              label={t('admin.settings.siteName')}
              value={settings.general.siteName}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, siteName: e.target.value },
              })}
            />
            <Input
              label={t('admin.settings.email')}
              type="email"
              value={settings.general.email}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, email: e.target.value },
              })}
            />
            <Input
              label={t('admin.settings.phone')}
              value={settings.general.phone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, phone: e.target.value },
              })}
            />
          </Grid>
          <Input
            label={t('admin.settings.siteDescription')}
            value={settings.general.siteDescription}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, siteDescription: e.target.value },
            })}
            multiline
          />
          <ImageUpload
            label={t('admin.settings.logo')}
            currentImage={settings.general.logo}
            onUpload={(file) => handleImageUpload(file, 'logo')}
          />
          <ImageUpload
            label={t('admin.settings.favicon')}
            currentImage={settings.general.favicon}
            onUpload={(file) => handleImageUpload(file, 'favicon')}
          />
        </Section>

        <Section>
          <h3>{t('admin.settings.social')}</h3>
          <Grid>
            <Input
              label={t('admin.settings.facebook')}
              value={settings.social.facebook}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, facebook: e.target.value },
              })}
            />
            <Input
              label={t('admin.settings.instagram')}
              value={settings.social.instagram}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, instagram: e.target.value },
              })}
            />
            <Input
              label={t('admin.settings.tripadvisor')}
              value={settings.social.tripadvisor}
              onChange={(e) => setSettings({
                ...settings,
                social: { ...settings.social, tripadvisor: e.target.value },
              })}
            />
          </Grid>
        </Section>

        <Section>
          <h3>{t('admin.settings.workingHours')}</h3>
          {Object.entries(settings.hours).map(([day, hours]) => (
            <WorkingHours key={day}>
              <div>{t(`admin.settings.days.${day}`)}</div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Switch
                  checked={!hours.closed}
                  onChange={(checked) => setSettings({
                    ...settings,
                    hours: {
                      ...settings.hours,
                      [day]: { ...hours, closed: !checked },
                    },
                  })}
                />
                {!hours.closed && (
                  <>
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          [day]: { ...hours, open: e.target.value },
                        },
                      })}
                    />
                    <span>-</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          [day]: { ...hours, close: e.target.value },
                        },
                      })}
                    />
                  </>
                )}
              </div>
            </WorkingHours>
          ))}
        </Section>

        <Section>
          <h3>{t('admin.settings.features')}</h3>
          <Grid>
            <Switch
              label={t('admin.settings.enableReviews')}
              checked={settings.features.enableReviews}
              onChange={(checked) => setSettings({
                ...settings,
                features: { ...settings.features, enableReviews: checked },
              })}
            />
            <Switch
              label={t('admin.settings.enableBooking')}
              checked={settings.features.enableBooking}
              onChange={(checked) => setSettings({
                ...settings,
                features: { ...settings.features, enableBooking: checked },
              })}
            />
            <Switch
              label={t('admin.settings.enableNewsletter')}
              checked={settings.features.enableNewsletter}
              onChange={(checked) => setSettings({
                ...settings,
                features: { ...settings.features, enableNewsletter: checked },
              })}
            />
            <Switch
              label={t('admin.settings.maintenanceMode')}
              checked={settings.features.maintenanceMode}
              onChange={(checked) => setSettings({
                ...settings,
                features: { ...settings.features, maintenanceMode: checked },
              })}
            />
          </Grid>
        </Section>
      </Form>
    </SettingsWrapper>
  );
}

export default SettingsManagement; 