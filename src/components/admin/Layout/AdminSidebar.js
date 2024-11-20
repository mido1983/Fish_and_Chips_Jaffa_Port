import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { 
  FaHome, 
  FaImages, 
  FaUtensils, 
  FaComments, 
  FaEnvelope, 
  FaChartBar,
  FaCog 
} from 'react-icons/fa';

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: white;
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: 1.2em;
  }
`;

function AdminSidebar() {
  const { t } = useTranslation();

  const menuItems = [
    { icon: <FaHome />, label: 'dashboard', path: '/admin' },
    { icon: <FaImages />, label: 'gallery', path: '/admin/gallery' },
    { icon: <FaUtensils />, label: 'menu', path: '/admin/menu' },
    { icon: <FaComments />, label: 'reviews', path: '/admin/reviews' },
    { icon: <FaEnvelope />, label: 'messages', path: '/admin/messages' },
    { icon: <FaChartBar />, label: 'statistics', path: '/admin/statistics' },
    { icon: <FaCog />, label: 'settings', path: '/admin/settings' },
  ];

  return (
    <SidebarNav>
      {menuItems.map(({ icon, label, path }) => (
        <NavItem key={path} to={path}>
          {icon}
          <span>{t(`admin.sidebar.${label}`)}</span>
        </NavItem>
      ))}
    </SidebarNav>
  );
}

export default AdminSidebar; 