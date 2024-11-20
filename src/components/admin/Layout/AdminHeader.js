import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';

const HeaderWrapper = styled.header`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1.2rem;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 50%;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 10px;
  min-width: 15px;
  text-align: center;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const UserInfo = styled.div`
  text-align: right;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
`;

function AdminHeader() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <HeaderWrapper>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <UserSection>
        <NotificationButton onClick={() => setShowNotifications(!showNotifications)}>
          <FaBell />
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </NotificationButton>
        {showNotifications && (
          <NotificationsDropdown 
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
        <UserMenu>
          <UserInfo>
            <UserName>{user?.name}</UserName>
            <UserRole>{t('admin.role.administrator')}</UserRole>
          </UserInfo>
          <FaUserCircle size={24} />
          <button onClick={logout} title={t('admin.logout')}>
            <FaSignOutAlt />
          </button>
        </UserMenu>
      </UserSection>
    </HeaderWrapper>
  );
}

export default AdminHeader; 