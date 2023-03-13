import { Direction } from 'react-component-library';
import { telcoDummyData } from '../data/dummy';
import { Table } from '../components/table';

export function TelcoTable() {
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
  return <Table data={testData} dataFields={testDataFields} />;
}
