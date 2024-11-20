import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

const SwitcherWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const LanguageList = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const LanguageOption = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = {
    en: 'English',
    he: 'עברית',
    ru: 'Русский',
    ar: 'العربية'
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = ['he', 'ar'].includes(lang) ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  return (
    <SwitcherWrapper>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        {languages[i18n.language]}
      </LanguageButton>
      <LanguageList $isOpen={isOpen}>
        {Object.entries(languages).map(([code, name]) => (
          <LanguageOption
            key={code}
            onClick={() => handleLanguageChange(code)}
          >
            {name}
          </LanguageOption>
        ))}
      </LanguageList>
    </SwitcherWrapper>
  );
}

export default LanguageSwitcher; 