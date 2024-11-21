import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, Nav } from 'react-bootstrap';
import { IMAGES } from '../../constants/imagePaths';

const MenuWrapper = styled.div`
  padding-top: 2rem;
  background: #fff;
`;

const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    color: #1B365D;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const TabsContainer = styled(Nav)`
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #ddd;
`;

const TabItem = styled(Nav.Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #1B365D;
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.active {
    color: #C4A962;
    border-bottom: 2px solid #C4A962;
  }
  
  &:hover {
    color: #C4A962;
  }
`;

const MenuSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #1B365D;
  text-align: center;
  margin-bottom: 2rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const MenuItem = styled.div`
  text-align: center;
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    color: #1B365D;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    color: #C4A962;
    font-weight: 600;
  }
`;

const MENU_ITEMS = {
  fish: [
    {
      id: 'cod',
      name: 'Classic Cod',
      description: 'Fresh Atlantic cod in crispy beer batter',
      price: 69,
      image: IMAGES.MENU.FISH
    },
    {
      id: 'haddock',
      name: 'Haddock',
      description: 'Premium haddock fillet, lightly battered',
      price: 75,
      image: IMAGES.MENU.FISH
    },
    {
      id: 'salmon',
      name: 'Grilled Salmon',
      description: 'Scottish salmon with herbs and lemon',
      price: 89,
      image: IMAGES.MENU.FISH
    }
  ],
  chips: [
    {
      id: 'classic-chips',
      name: 'Classic Chips',
      description: 'Hand-cut potatoes, double fried',
      price: 25,
      image: IMAGES.MENU.CHIPS
    },
    {
      id: 'sweet-potato',
      name: 'Sweet Potato Fries',
      description: 'Crispy sweet potato fries',
      price: 29,
      image: IMAGES.MENU.CHIPS
    }
  ],
  sides: [
    {
      id: 'mushy-peas',
      name: 'Mushy Peas',
      description: 'Traditional British mushy peas',
      price: 15,
      image: IMAGES.MENU.SIDES
    },
    {
      id: 'coleslaw',
      name: 'Homemade Coleslaw',
      description: 'Fresh cabbage, carrots, and mayo',
      price: 15,
      image: IMAGES.MENU.SIDES
    },
    {
      id: 'onion-rings',
      name: 'Onion Rings',
      description: 'Beer-battered onion rings',
      price: 19,
      image: IMAGES.MENU.SIDES
    }
  ],
  drinks: [
    {
      id: 'soft-drinks',
      name: 'Soft Drinks',
      description: 'Coca-Cola, Sprite, Fanta',
      price: 12,
      image: IMAGES.MENU.DRINKS
    },
    {
      id: 'beer',
      name: 'Draft Beer',
      description: 'Local and imported beers',
      price: 25,
      image: IMAGES.MENU.DRINKS
    },
    {
      id: 'wine',
      name: 'House Wine',
      description: 'Red or white wine',
      price: 29,
      image: IMAGES.MENU.DRINKS
    }
  ]
};

function MenuPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('fish');

  const menuTabs = [
    { id: 'fish', label: t('menu.categories.fish') },
    { id: 'chips', label: t('menu.categories.chips') },
    { id: 'sides', label: t('menu.categories.sides') },
    { id: 'drinks', label: t('menu.categories.drinks') }
  ];

  return (
    <MenuWrapper>
      <Container>
        <MenuHeader>
          <h1>{t('menu.title')}</h1>
          <p>Experience the finest British fish & chips in Jaffa Port</p>
        </MenuHeader>

        <TabsContainer>
          {menuTabs.map(tab => (
            <TabItem
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabItem>
          ))}
        </TabsContainer>

        <MenuSection>
          <SectionTitle>{t(`menu.categories.${activeTab}`)}</SectionTitle>
          <MenuGrid>
            {MENU_ITEMS[activeTab].map(item => (
              <MenuItem key={item.id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>₪{item.price}</span>
              </MenuItem>
            ))}
          </MenuGrid>
        </MenuSection>
      </Container>
    </MenuWrapper>
  );
}

export default MenuPage; 