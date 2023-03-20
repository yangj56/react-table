import { ThemeProvider, useTheme, useThemeUpdate } from '../../custom-hooks/theme-context';

export default function UseContext() {
  return (
    <ThemeProvider>
      <FunctionComponent />
    </ThemeProvider>
  );
}

function FunctionComponent() {
  const darkTheme = useTheme();
  const updateTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#ccc',
    color: darkTheme ? '#ccc' : '#333',
  };
  return (
    <>
      <button onClick={updateTheme}>Toggle Improved Theme</button>
      <div style={themeStyles}>function theme</div>;
    </>
  );
}
