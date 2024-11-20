import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import MenuItemModal from './MenuItemModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

const MenuWrapper = styled.div`
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

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, variant }) => 
    variant === 'delete' ? theme.colors.error : theme.colors.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

function MenuManagement() {
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`/api/admin/menu/${item.id}`, {
        method: 'DELETE',
      });
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleSave = async (itemData) => {
    try {
      const method = itemData.id ? 'PUT' : 'POST';
      const url = itemData.id 
        ? `/api/admin/menu/${itemData.id}`
        : '/api/admin/menu';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      fetchMenuItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <MenuWrapper>
      <Header>
        <h2>{t('admin.menu.title')}</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedItem(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> {t('admin.menu.addItem')}
        </Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>{t('admin.menu.name')}</Th>
            <Th>{t('admin.menu.category')}</Th>
            <Th>{t('admin.menu.price')}</Th>
            <Th>{t('admin.menu.actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>₪{item.price}</Td>
              <Td>
                <Actions>
                  <ActionButton onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton 
                    variant="delete"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <FaTrash />
                  </ActionButton>
                </Actions>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <MenuItemModal
          item={selectedItem}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          title={t('admin.menu.deleteTitle')}
          message={t('admin.menu.deleteMessage', { name: selectedItem?.name })}
          onConfirm={() => {
            handleDelete(selectedItem);
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </MenuWrapper>
  );
}

export default MenuManagement; 