import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import UserModal from './UserModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import ResetPasswordModal from './ResetPasswordModal';
import { formatDistanceToNow } from 'date-fns';

const UsersWrapper = styled.div`
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const RoleTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${({ role, theme }) => {
    switch (role) {
      case 'admin':
        return theme.colors.primary + '22';
      case 'manager':
        return theme.colors.success + '22';
      default:
        return theme.colors.gray;
    }
  }};
  color: ${({ role, theme }) => {
    switch (role) {
      case 'admin':
        return theme.colors.primary;
      case 'manager':
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  }};
`;

function UserManagement() {
  const { t } = useTranslation();
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <UsersWrapper>
      <Header>
        <h2>{t('admin.users.title')}</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedUser(null);
            setIsUserModalOpen(true);
          }}
        >
          <FaPlus /> {t('admin.users.addUser')}
        </Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>{t('admin.users.name')}</Th>
            <Th>{t('admin.users.email')}</Th>
            <Th>{t('admin.users.role')}</Th>
            <Th>{t('admin.users.lastLogin')}</Th>
            <Th>{t('admin.users.actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <RoleTag role={user.role}>
                  {t(`admin.users.roles.${user.role}`)}
                </RoleTag>
              </Td>
              <Td>
                {user.lastLogin 
                  ? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })
                  : t('admin.users.never')}
              </Td>
              <Td>
                <Actions>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUserModalOpen(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsResetPasswordModalOpen(true);
                    }}
                  >
                    <FaKey />
                  </Button>
                  <Button
                    variant="error"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </Actions>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isUserModalOpen && (
        <UserModal
          user={selectedUser}
          onSave={fetchUsers}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          title={t('admin.users.deleteTitle')}
          message={t('admin.users.deleteMessage', { name: selectedUser?.name })}
          onConfirm={() => {
            handleDelete(selectedUser);
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          user={selectedUser}
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </UsersWrapper>
  );
}

export default UserManagement; 