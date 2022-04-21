import { createGlobalStyle } from "styled-components";
import CircularStdBook from "./fonts/CircularStd-Book.otf";

const FontStyles = createGlobalStyle`
@font-face {
  font-family: 'CircularStdBook';
  src: url(${CircularStdBook}) format('opentype');
}
* {
  font-family: 'CircularStdBook';
  box-sizing: 'border-box';
  }
`;

export default FontStyles;
