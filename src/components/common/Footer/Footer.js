import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SocialLinks from './SocialLinks';
import Map from '../Map/Map';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xlarge} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  padding: 0 ${({ theme }) => theme.spacing.large};
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    font-size: 1.2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const WorkingHours = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>{t('footer.contact')}</h3>
          <ContactInfo>
            <div>{t('footer.address')}</div>
            <div>Tel: +972-3-123-4567</div>
            <div>Email: info@fishandchips.com</div>
            <SocialLinks />
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.hours')}</h3>
          <WorkingHours>
            <div>{t('footer.weekdays')}:</div>
            <div>11:00 - 22:00</div>
            <div>{t('footer.friday')}:</div>
            <div>11:00 - 16:00</div>
            <div>{t('footer.saturday')}:</div>
            <div>{t('footer.closed')}</div>
          </WorkingHours>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.location')}</h3>
          <Map height="200px" />
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {currentYear} Fish & Chips Jaffa Port. {t('footer.rights')}
      </Copyright>
    </FooterWrapper>
  );
}

export default Footer; 