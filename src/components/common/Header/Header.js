import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  min-height: 4rem;

  .navbar-toggler {
    // position: absolute;
    top: 1rem;
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      position: fixed;
      top: 0;

      bottom: 0;
      width: 80%;
      max-width: 320px;
      height: 100vh !important;
      background-color: ${({ theme }) => theme.colors.white};
      padding: 60px 20px 20px;

      transition: transform 0.3s ease-in-out;
      z-index: 1020;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);

      &.show {
        transform: translateX(0);
      }
    }
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const LogoSection = styled.div`
  order: 1;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  order: 2;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const LanguageSwitcherWrapper = styled.div`
  order: 3;
`;

const StyledNav = styled(Nav)`
  display: flex;
  gap: 1rem;
  margin-right: 2rem;

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
    margin-right: 0;

    .nav-link {
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
  }

  .nav-link {
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Overlay = styled.div`
  display: ${props => props.$show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1010;
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const isRtl = ['he', 'ar'].includes(i18n.language);

  const handleClose = () => setExpanded(false);

  return (
    <>
      <StyledNavbar expand="lg" expanded={expanded}>
        <StyledContainer>
          <LogoSection>
            <Navbar.Brand as={Link} to="/">Fish & Chips</Navbar.Brand>
          </LogoSection>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
          />
          <NavSection>
            <StyledNav>
              <Nav.Link as={Link} to="/" onClick={handleClose}>{t('nav.home')}</Nav.Link>
              <Nav.Link as={Link} to="/menu" onClick={handleClose}>{t('nav.menu')}</Nav.Link>
              <Nav.Link as={Link} to="/gallery" onClick={handleClose}>{t('nav.gallery')}</Nav.Link>
              <Nav.Link as={Link} to="/reviews" onClick={handleClose}>{t('nav.reviews')}</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose}>{t('nav.contact')}</Nav.Link>
            </StyledNav>
          </NavSection>
          <LanguageSwitcherWrapper>
            <LanguageSwitcher />
          </LanguageSwitcherWrapper>
        </StyledContainer>
      </StyledNavbar>
      <Overlay $show={expanded} onClick={handleClose} />
    </>
  );
};

export default Header; 