import { createGlobalStyle } from "styled-components";
import background from "../assets/xp-background.png";

export const GlobalStyles = createGlobalStyle`
  body {
    background:
      linear-gradient(rgba(0, 128, 128, 0.2), rgba(0, 128, 128, 0.2)), 
      url(${background}) no-repeat center center fixed;
    background-size: cover;
    background-color: #008080
  }

  /* Windows XP Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #C0C0C0;
    border: 3px solid #FFFFFF;
  }

  /* Window button styling */
  button {
    background: #C0C0C0;
    border: 2px outset #FFFFFF;
    padding: 2px 6px;
    font-family: Tahoma;
    &:active {
      border-style: inset;
    }
  }
`;
