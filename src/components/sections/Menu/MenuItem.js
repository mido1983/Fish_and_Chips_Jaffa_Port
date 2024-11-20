import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../common/Image/OptimizedImage';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.black};
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 18px;
`;

function MenuItem({ item }) {
  const { t } = useTranslation();
  
  return (
    <Card>
      <OptimizedImage
        src={item.image}
        alt={item.name}
        height="200px"
        hover
      />
      <Content>
        <Title>{t(`menu.items.${item.id}.name`)}</Title>
        <Description>{t(`menu.items.${item.id}.description`)}</Description>
        <Price>₪{item.price}</Price>
      </Content>
    </Card>
  );
}

export default MenuItem; 