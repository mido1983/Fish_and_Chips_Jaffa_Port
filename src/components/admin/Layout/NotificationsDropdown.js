import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  
  ${({ unread, theme }) => unread && `
    background-color: ${theme.colors.primary}11;
  `}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  color: #666;
`;

function NotificationsDropdown({ notifications, onClose }) {
  const { t } = useTranslation();

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        // Mark as read
        await fetch(`/api/notifications/${notification.id}/read`, {
          method: 'POST',
        });
        
        // Handle navigation or action based on notification type
        switch (notification.type) {
          case 'review':
            // Navigate to review
            break;
          case 'message':
            // Navigate to message
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  return (
    <DropdownWrapper>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            unread={!notification.read}
            onClick={() => handleNotificationClick(notification)}
          >
            <NotificationTitle>{notification.title}</NotificationTitle>
            <div>{notification.message}</div>
            <NotificationTime>
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </NotificationTime>
          </NotificationItem>
        ))
      ) : (
        <EmptyState>{t('admin.notifications.empty')}</EmptyState>
      )}
    </DropdownWrapper>
  );
}

export default NotificationsDropdown; 