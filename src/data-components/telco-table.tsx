import { Direction } from 'react-component-library';
import { telcoDummyData } from '../data/dummy';
import { Table } from '../components/table';

export function TelcoTable() {
  return (
    <Table
      data={telcoDummyData}
      dataFields={[
        {
          name: 'Operator',
          sortable: true,
        },
        {
          name: 'Headset Display',
          sortable: true,
        },
        {
          name: '3G Availability',
          sortable: false,
        },
      ]}
      sortableField={{
        name: 'Operator',
        direction: Direction.UP,
      }}
    />
  );
}
