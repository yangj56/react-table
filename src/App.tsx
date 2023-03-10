import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import {
  GlobalStyles,
  Themes,
  Size,
  Radio,
  Label,
} from 'react-component-library';
import { useState } from 'react';
import { TelcoTable } from './components/telco-table';
import { CustomerTable } from './components/customer-table';
import { CompanyTable } from './components/company-table';

function App() {
  const defaultBasicDefault = Themes[1];
  const [theme, setTheme] = useState(defaultBasicDefault);

  function onRadioButtonChange(theme: DefaultTheme) {
    setTheme(theme);
  }

  function generateRadioButtons() {
    return Themes.map((item, index) => (
      <LabelContainer key={`radio-${index}`}>
        <Radio
          checked={item.name === theme.name}
          value={item.name}
          label={item.name}
          displaySize={Size.NORMAL}
          onChange={() => onRadioButtonChange(item)}
        />
      </LabelContainer>
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
const LabelContainer = styled.label`
  display: flex;
  align-items: center;
`;

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
