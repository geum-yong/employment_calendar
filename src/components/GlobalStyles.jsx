import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset} // styled-normalize

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default GlobalStyles;
