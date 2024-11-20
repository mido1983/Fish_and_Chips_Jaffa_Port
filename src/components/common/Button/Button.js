import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: ${({ size = 'medium' }) => ({
    small: '8px 16px',
    medium: '12px 24px',
    large: '16px 32px'
  }[size])};
  
  font-size: ${({ size = 'medium' }) => ({
    small: '14px',
    medium: '16px',
    large: '18px'
  }[size])};
  
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.white};
          &:hover {
            background-color: ${({ theme }) => theme.colors.primary}dd;
          }
        `;
      case 'secondary':
        return css`
          background-color: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.black};
          &:hover {
            background-color: ${({ theme }) => theme.colors.secondary}dd;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 2px solid ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primary};
          &:hover {
            background-color: ${({ theme }) => theme.colors.primary};
            color: ${({ theme }) => theme.colors.white};
          }
        `;
      default:
        return '';
    }
  }}
  
  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

export default Button; 