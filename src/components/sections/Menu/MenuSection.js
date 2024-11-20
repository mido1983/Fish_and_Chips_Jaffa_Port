import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import { menuService } from '../../../services/api';

const MenuWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

function MenuSection() {
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuService.getMenuItems();
        setMenuItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <MenuWrapper>
      {categories.map(category => (
        <div key={category}>
          <CategoryTitle>{t(`menu.categories.${category}`)}</CategoryTitle>
          <MenuGrid>
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
          </MenuGrid>
        </div>
      ))}
    </MenuWrapper>
  );
}

export default MenuSection; 