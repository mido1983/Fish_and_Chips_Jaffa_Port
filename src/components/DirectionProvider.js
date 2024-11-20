import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const DirectionWrapper = styled.div`
  direction: ${({ $isRtl }) => ($isRtl ? 'rtl' : 'ltr')};
  text-align: ${({ $isRtl }) => ($isRtl ? 'right' : 'left')};
`;

export const DirectionProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const rtl = ['he', 'ar'].includes(i18n.language);

  return (
    <DirectionWrapper $isRtl={rtl}>
      {children}
    </DirectionWrapper>
  );
};

export default DirectionProvider; 