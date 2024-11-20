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
    position: absolute;
    ${props => props.$isRtl ? 'left: auto; right: 15px;' : 'left: 15px; right: auto;'};
    z-index: 1030;
  }

  .navbar-brand {
    position: absolute;
    ${props => props.$isRtl ? 'right: 50%; transform: translateX(50%);' : 'left: 50%; transform: translateX(-50%);'};
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      position: fixed;
      top: 0;
      ${props => props.$isRtl ? 'right: 0;' : 'left: 0;'};
      bottom: 0;
      width: 80%;
      max-width: 320px;
      height: 100vh !important;
      background-color: ${({ theme }) => theme.colors.white};
      padding: 60px 20px 20px;
      transform: ${props => props.$isRtl 
        ? 'translateX(100%)' 
        : 'translateX(-100%)'};
      transition: transform 0.3s ease-in-out;
      z-index: 1020;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);

      &.show {
        transform: translateX(0);
      }
    }



    .nav-link {
      padding: 15px 0;
      text-align: ${props => props.$isRtl ? 'right' : 'left'};
      border-bottom: 1px solid rgba(0,0,0,0.1);
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
  background-color: rgba(0,0,0,0.5);
  z-index: 1010;
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const isRtl = ['he', 'ar'].includes(i18n.language);

  const handleClose = () => setExpanded(false);

  return (
    <>
      <StyledNavbar expand="lg" expanded={expanded} $isRtl={isRtl}>
        <Container>
          <Navbar.Brand as={Link} to="/">Fish & Chips</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={handleClose}>{t('nav.home')}</Nav.Link>
              <Nav.Link as={Link} to="/menu" onClick={handleClose}>{t('nav.menu')}</Nav.Link>
              <Nav.Link as={Link} to="/gallery" onClick={handleClose}>{t('nav.gallery')}</Nav.Link>
              <Nav.Link as={Link} to="/reviews" onClick={handleClose}>{t('nav.reviews')}</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose}>{t('nav.contact')}</Nav.Link>
            </Nav>
            <LanguageSwitcher />
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
      <Overlay $show={expanded} onClick={handleClose} />
    </>
  );
};

export default Header; 