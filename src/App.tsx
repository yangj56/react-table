import { useState } from 'react';
import {
  GlobalStyles,
  Label,
  Radio,
  Size,
  Themes,
} from 'react-component-library';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { Router } from './router';

function App() {
  const defaultBasicDefault = Themes[0];
  const [theme, setTheme] = useState(defaultBasicDefault);

  function onRadioButtonChange(theme: DefaultTheme) {
    setTheme(theme);
  }

  function generateRadioButtons() {
    return Themes.map((item, index) => (
      <PaddedRadio key={`radio-${index}`}>
        <Radio
          checked={item.name === theme.name}
          value={item.name}
          label={item.name}
          displaySize={Size.NORMAL}
          onChange={() => onRadioButtonChange(item)}
        />
      </PaddedRadio>
    ));
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainContainer>
        <DisplayContainer>
          <DivContainer>
            <Label label="Switch theme: " displaySize={Size.NORMAL} />
            <ThemeContainer>{generateRadioButtons()}</ThemeContainer>
          </DivContainer>
          <Router />
        </DisplayContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem;
`;

const ThemeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DisplayContainer = styled.div`
  width: 80%;
`;

const PaddedRadio = styled.div`
  margin-right: 2rem;
`;
export default App;
