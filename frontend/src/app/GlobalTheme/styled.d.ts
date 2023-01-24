// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    dark: {
      primary: string;
      text: string;
    };
    light: {
      primary: string;
      text: string;
    };
    button: {
      primary: string;
      secondary: string;
    };
  }
}
