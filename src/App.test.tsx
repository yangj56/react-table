import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styled, { ThemeProvider } from 'styled-components';
import { Table } from './components/table';

const Mock = styled.div``;

jest.mock('react-component-library', () => ({
  Label: (props: any) => {
    return <Mock {...props} />;
  },
  Base: (props: any) => {
    return <Mock {...props} />;
  },
  Arrow: (props: any) => {
    return <Mock {...props} />;
  },
  Radio: (props: any) => {
    return <Mock {...props} />;
  },
  Checkbox: (props: any) => {
    return <Mock {...props} />;
  },
  Color: {
    PURPLE: '#5C50BB',
    LIGHT_PURPLE: '#EFEDFD',
    RED: '#FF0000',
    LIGHT_RED: '#FFD8D8',
    GREY: '#A8A8A8',
    LIGHT_GREY: '#E1E1E1',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    DARK_WHITE: '#F7F7F7',
  },
  BaseShape: {
    ROUND: 'round',
    SQUARE: 'square',
  },
  Direction: {
    UP: 'up',
    DOWN: 'down',
    UNI: 'uni',
  },
  Size: {
    NORMAL: 'normal',
    SMALL: 'small',
    LARGE: 'large',
  },
}));

const mockThemes = {
  name: 'mock',
  color: {
    PRIMARY: 'red',
    SECONDARY: 'red',
    BORDER: 'red',
    BLACK: 'red',
    WHITE: 'red',
    UNDERLINED: 'red',
    NEUTRAL: 'red',
  },
  fontFamily: 'Avenir',
};

describe('test components with mock themes', () => {
  const testData: Record<string, string>[] = [
    {
      ID: 'telco-1',
      field1: 'test1-1',
      field2: 'test1-2',
    },
    {
      ID: 'telco-2',
      field1: 'test2-1',
      field2: 'test2-2',
    },
  ];
  const testDataFields = [
    {
      name: 'field1',
      sortable: false,
    },
    {
      name: 'field2',
      sortable: false,
    },
  ];

  it('display 2 columns', async () => {
    render(
      <ThemeProvider theme={mockThemes}>
        <Table data={testData} dataFields={testDataFields} />
      </ThemeProvider>
    );
    const foundComponent = await screen.findAllByTestId('column');
    expect(foundComponent).toHaveLength(2);
  });
  it('display table with base', async () => {
    render(
      <ThemeProvider theme={mockThemes}>
        <Table data={testData} dataFields={testDataFields} />
      </ThemeProvider>
    );
    const foundComponent = await screen.findAllByTestId('base');
    expect(foundComponent).toHaveLength(1);
  });
});

describe('test components with mock themes sorting', () => {
  const testData: Record<string, string>[] = [
    {
      ID: 'telco-1',
      field1: 'test1-1',
      field2: 'test1-2',
    },
    {
      ID: 'telco-2',
      field1: 'test2-1',
      field2: 'test2-2',
    },
  ];
  const testDataFields = [
    {
      name: 'field1',
      sortable: true,
    },
    {
      name: 'field2',
      sortable: false,
    },
  ];

  it('display 2 columns', async () => {
    render(
      <ThemeProvider theme={mockThemes}>
        <Table data={testData} dataFields={testDataFields} />
      </ThemeProvider>
    );
    const foundComponent = await screen.findAllByTestId('sort');
    expect(foundComponent).toHaveLength(1);
    const foundColumns = await screen.findAllByTestId('column-1');
    expect(foundColumns).toHaveLength(2);
    act(() => {
      userEvent.click(foundComponent[0]);
    });
    const checkColumns = await screen.findAllByTestId('column-1');
    expect(checkColumns).toHaveLength(2);
  });
});
