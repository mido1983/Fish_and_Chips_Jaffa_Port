import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaStar } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import MessageModal from './MessageModal';
import { formatDistanceToNow } from 'date-fns';

const MessagesWrapper = styled.div`
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

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  align-items: center;
  cursor: pointer;
  background-color: ${({ unread, theme }) => 
    unread ? theme.colors.primary + '11' : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const Sender = styled.div`
  font-weight: ${({ unread }) => unread ? 'bold' : 'normal'};
`;

const Subject = styled.div`
  font-weight: ${({ unread }) => unread ? 'bold' : 'normal'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  span:last-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

function MessageManagement() {
  const { t } = useTranslation();
  const [messages, setMessages] = React.useState([]);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (message) => {
    try {
      await fetch(`/api/admin/messages/${message.id}/read`, {
        method: 'POST',
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (message) => {
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: 'DELETE',
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleStarMessage = async (message) => {
    try {
      await fetch(`/api/admin/messages/${message.id}/star`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starred: !message.starred }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error starring message:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const unreadCount = messages.filter(m => !m.read).length;
  const starredCount = messages.filter(m => m.starred).length;

  return (
    <MessagesWrapper>
      <Header>
        <h2>{t('admin.messages.title')}</h2>
      </Header>

      <Stats>
        <StatItem>
          <span>{messages.length}</span>
          <span>{t('admin.messages.total')}</span>
        </StatItem>
        <StatItem>
          <span>{unreadCount}</span>
          <span>{t('admin.messages.unread')}</span>
        </StatItem>
        <StatItem>
          <span>{starredCount}</span>
          <span>{t('admin.messages.starred')}</span>
        </StatItem>
      </Stats>

      <MessagesList>
        {messages.map((message) => (
          <MessageRow 
            key={message.id}
            unread={!message.read}
            onClick={() => {
              setSelectedMessage(message);
              setIsMessageModalOpen(true);
              if (!message.read) {
                handleMarkAsRead(message);
              }
            }}
          >
            <Sender unread={!message.read}>{message.name}</Sender>
            <Subject unread={!message.read}>{message.subject}</Subject>
            <Time>
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </Time>
            <Actions onClick={(e) => e.stopPropagation()}>
              <Button
                variant="primary"
                onClick={() => handleStarMessage(message)}
              >
                <FaStar color={message.starred ? '#FFB800' : '#DDD'} />
              </Button>
              {!message.read ? (
                <Button
                  variant="success"
                  onClick={() => handleMarkAsRead(message)}
                >
                  <FaEnvelopeOpen />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                >
                  <FaEnvelope />
                </Button>
              )}
              <Button
                variant="error"
                onClick={() => {
                  setSelectedMessage(message);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </Button>
            </Actions>
          </MessageRow>
        ))}
      </MessagesList>

      {isMessageModalOpen && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setIsMessageModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          title={t('admin.messages.deleteTitle')}
          message={t('admin.messages.deleteMessage')}
          onConfirm={() => {
            handleDelete(selectedMessage);
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </MessagesWrapper>
  );
}

export default MessageManagement; 