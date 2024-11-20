import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function Header() {
  const { t } = useTranslation();

  return (
    <HeaderWrapper>
      <Nav>
        <Logo to="/">Fish & Chips Jaffa Port</Logo>
        <NavLinks>
          <NavLink to="/menu">{t('nav.menu')}</NavLink>
          <NavLink to="/gallery">{t('nav.gallery')}</NavLink>
          <NavLink to="/reviews">{t('nav.reviews')}</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
          <LanguageSwitcher />
        </NavLinks>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header; 