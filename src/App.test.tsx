import { render, screen } from '@testing-library/react';
import { Color, Themes } from 'react-component-library';
import { ThemeType } from 'react-component-library/dist/utils/typings';
import { ThemeProvider } from 'styled-components';
import { Table } from './components/table';

describe('test', () => {
  it('inner test', () => {
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
    render(
      <ThemeProvider
        theme={{
          name: ThemeType.THEME_1,
          color: {
            PRIMARY: Color.PURPLE,
            SECONDARY: Color.LIGHT_PURPLE,
            BORDER: Color.GREY,
            BLACK: Color.BLACK,
            WHITE: Color.WHITE,
            UNDERLINED: Color.LIGHT_GREY,
            NEUTRAL: Color.DARK_WHITE,
          },
          fontFamily: 'Avenir',
        }}
      >
        <Table data={testData} dataFields={testDataFields} />
      </ThemeProvider>
    );
    expect(true).toBeTruthy();
  });
});
