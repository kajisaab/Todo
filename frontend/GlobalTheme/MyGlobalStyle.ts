import { createGlobalStyle } from 'styled-components';

interface Props {
  darkMode: boolean;
}

export const MyGlobalStyle = createGlobalStyle<Props>`
*{
  padding: 0; 
  margin: 0; 
}
    body{ 
      ${(props) =>
        props.darkMode
          ? `
      background-color: ${props.theme.dark.primary};
      color: ${props.theme.dark.text};
      `
          : `
      background-color: ${props.theme.light.primary};
      color: ${props.theme.light.text}
      `}
       
    }
`;
