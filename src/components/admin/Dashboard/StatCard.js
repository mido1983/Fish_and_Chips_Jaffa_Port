import React from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  color: ${({ positive }) => positive ? '#4CAF50' : '#F44336'};
`;

function StatCard({ icon, title, value, trend }) {
  const isPositive = trend >= 0;

  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Trend positive={isPositive}>
        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
        {Math.abs(trend)}%
      </Trend>
    </Card>
  );
}

export default StatCard; 