import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import { format } from 'date-fns';

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const MessageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: ${({ theme }) => theme.spacing.medium};
`;

const MessageField = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: ${({ theme }) => theme.spacing.small};
  
  label {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const MessageBody = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
  padding-top: ${({ theme }) => theme.spacing.large};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

function MessageModal({ message, onClose }) {
  const { t } = useTranslation();
  const [replyText, setReplyText] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await fetch(`/api/admin/messages/${message.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply: replyText }),
      });
      onClose();
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal
      title={t('admin.messages.viewMessage')}
      onClose={onClose}
      size="large"
    >
      <MessageContent>
        <MessageHeader>
          <MessageField>
            <label>{t('admin.messages.from')}:</label>
            <div>{message.name}</div>
          </MessageField>
          <MessageField>
            <label>{t('admin.messages.email')}:</label>
            <div>{message.email}</div>
          </MessageField>
          <MessageField>
            <label>{t('admin.messages.date')}:</label>
            <div>{format(new Date(message.createdAt), 'PPpp')}</div>
          </MessageField>
          <MessageField>
            <label>{t('admin.messages.subject')}:</label>
            <div>{message.subject}</div>
          </MessageField>
        </MessageHeader>

        <MessageBody>{message.message}</MessageBody>

        <ReplyForm onSubmit={handleReply}>
          <h3>{t('admin.messages.reply')}</h3>
          <TextArea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t('admin.messages.replyPlaceholder')}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isSending || !replyText.trim()}
          >
            {isSending ? t('common.sending') : t('common.send')}
          </Button>
        </ReplyForm>
      </MessageContent>
    </Modal>
  );
}

export default MessageModal; 