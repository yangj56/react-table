import { Component, createContext, ReactNode, useContext, useState } from 'react';

export const ThemeContext = createContext(true);

export default function UseContext() {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }
  return (
    <div>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <ClassComponent />
        <FunctionComponent />
      </ThemeContext.Provider>
    </div>
  );
}

class ClassComponent extends Component {
  themeStyles(dark: boolean) {
    return {
      backgroundColor: dark ? '#333' : '#ccc',
      color: dark ? '#ccc' : '#333',
    };
  }

  render(): ReactNode {
    return (
      <ThemeContext.Consumer>
        {(darkTheme) => {
          return <div style={this.themeStyles(darkTheme)}>class theme</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

function FunctionComponent() {
  const darkTheme = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#ccc',
    color: darkTheme ? '#ccc' : '#333',
  };
  return <div style={themeStyles}>function theme</div>;
}
