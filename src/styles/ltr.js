import { css } from 'styled-components';

export const ltrStyles = css`
  direction: ltr;
  text-align: left;

  /* Навигация */
  nav {
    // flex-direction: row;
  }

  /* Отступы */
  padding-right: 0;
  padding-left: ${({ theme }) => theme.spacing.medium};

  /* Выпадающие меню */
  .dropdown {
    left: auto;
    right: 0;
  }

  /* Формы */
  input, 
  textarea {
    text-align: left;
  }
`; 