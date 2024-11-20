import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
  background-color: #fff0f0;
  border-radius: 8px;
  margin: ${({ theme }) => theme.spacing.large};
`;

const ErrorTitle = styled.h2`
  color: red;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ErrorMessage = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const RetryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 