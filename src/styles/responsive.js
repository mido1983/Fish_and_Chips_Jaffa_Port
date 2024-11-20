import { css } from 'styled-components';

export const responsive = {
  mobile: (...args) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      ${css(...args)}
    }
  `
}; 