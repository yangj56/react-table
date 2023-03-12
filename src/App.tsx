import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import {
  GlobalStyles,
  Themes,
  Size,
  Radio,
  Label,
} from 'react-component-library';
import { useState } from 'react';
import { CompanyTable } from './data-components/company-table';
import { CustomerTable } from './data-components/customer-table';
import { TelcoTable } from './data-components/telco-table';

function App() {
  const defaultBasicDefault = Themes[0];
  const [theme, setTheme] = useState(defaultBasicDefault);

  function onRadioButtonChange(theme: DefaultTheme) {
    setTheme(theme);
  }

  function generateRadioButtons() {
    return Themes.map((item, index) => (
      <Radio
        checked={item.name === theme.name}
        value={item.name}
        label={item.name}
        displaySize={Size.NORMAL}
        key={`radio-${index}`}
        onChange={() => onRadioButtonChange(item)}
      />
    ));
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainContainer>
        <DisplayContainer>
          <DivContainer>
            <Label label="Switch theme" displaySize={Size.NORMAL} />
            {generateRadioButtons()}
          </DivContainer>
          <TelcoTable />
          <CustomerTable />
          <CompanyTable />
        </DisplayContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DisplayContainer = styled.div`
  width: 80%;
`;
export default App;
