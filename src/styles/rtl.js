import { css } from 'styled-components';

export const rtlStyles = css`
  direction: rtl;
  text-align: right;

  /* Навигация */
  nav {
   // flex-direction: row-reverse;
  }

  /* Отступы */
  padding-left: 0;
  padding-right: ${({ theme }) => theme.spacing.medium};

  /* Иконки и стрелки */
  .icon {
    transform: scaleX(-1);
  }

  /* Выпадающие меню */
  .dropdown {
    right: auto;
    left: 0;
  }

  /* Формы */
  input, 
  textarea {
    text-align: right;
  }
`; 