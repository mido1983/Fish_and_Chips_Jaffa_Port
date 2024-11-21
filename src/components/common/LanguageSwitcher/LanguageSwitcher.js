import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;

const LanguageButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const LanguageMenu = styled.div`
  position: absolute;
  top: 100%;
  ${props => props.$isRtl ? 'right: 0;' : 'left: 0;'}
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  min-width: 120px;
  margin-top: 0.5rem;
`;

const LanguageOption = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: ${props => props.$isRtl ? 'right' : 'left'};
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = ['he', 'ar'].includes(i18n.language);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' },
    { code: 'ar', label: 'العربية' },
    { code: 'ru', label: 'Русский' }
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    document.dir = ['he', 'ar'].includes(langCode) ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  return (
    <LanguageWrapper>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        {languages.find(lang => lang.code === i18n.language)?.label}
      </LanguageButton>
      
      <LanguageMenu $isOpen={isOpen} $isRtl={isRtl}>
        {languages.map(lang => (
          <LanguageOption
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={i18n.language === lang.code ? 'active' : ''}
            $isRtl={isRtl}
          >
            {lang.label}
          </LanguageOption>
        ))}
      </LanguageMenu>
    </LanguageWrapper>
  );
};

export default LanguageSwitcher; 