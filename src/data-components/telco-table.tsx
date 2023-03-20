import { Direction } from 'react-component-library';
import { Table } from '../components/table';
import { telcoDummyData } from '../data/dummy';

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
