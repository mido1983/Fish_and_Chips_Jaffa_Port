import React from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.colors.gray};
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
  
  ${({ error }) => error && css`
    background-color: #fff0f0;
  `}
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

function Input({
  label,
  error,
  type = 'text',
  ...props
}) {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        type={type}
        error={error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
}

export default Input; 