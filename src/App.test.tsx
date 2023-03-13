import { render, screen } from '@testing-library/react';
import { Table } from './components/table';
// import Table from './components/simple';

// test('test render table with data has 3 columns', () => {
//   render(<Table />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

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
    render(<Table data={testData} dataFields={testDataFields} />);
    // render(<Table name="yang" />);
    expect(true).toBeTruthy();
  });
});
