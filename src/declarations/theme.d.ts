import { ThemeInterface } from 'react-component-library';
import 'styled-components';

export declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {
    name: string;
  }
}
