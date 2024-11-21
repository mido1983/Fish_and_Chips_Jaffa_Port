import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { IMAGES } from '../constants/imagePaths';

const HeroSection = styled.section`
  height: calc(100vh - 4rem);
  background-image: url(${IMAGES.HERO.BACKGROUND});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  margin: 0;
  padding: 0;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-top: -16px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  
  img {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-bottom: 1.5rem;
    border-radius: 8px;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection>
        <HeroContent>
          <h1>{t('home.welcome')}</h1>
          <p>{t('home.description')}</p>
          <StyledButton>{t('menu.title')}</StyledButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <Row>
            <Col md={4}>
              <FeatureCard>
              <img src={IMAGES.MENU.FISH} alt="Fish & Chips Jaffa Port" />
                <h3>{t('menu.categories.fish')}</h3>
                <p>Fresh daily caught fish from Mediterranean Sea</p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
              <img src={IMAGES.MENU.FISH} alt="Fish & Chips Jaffa Port" />
                <h3>{t('menu.categories.chips')}</h3>
                <p>Hand-cut potatoes fried to golden perfection</p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
              <img src={IMAGES.MENU.FISH} alt="Fish & Chips Jaffa Port" />
                <h3>{t('footer.location')}</h3>
                <p>Located in the historic Jaffa Port</p>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </FeaturesSection>
    </>
  );
};

export default HomePage; 