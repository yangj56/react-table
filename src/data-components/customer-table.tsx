import { Direction } from 'react-component-library';
import { Table } from '../components/table';
import { customerDummydata } from '../data/dummy';

export function CustomerTable() {
  return (
    <Table
      data={customerDummydata}
      dataFields={[
        {
          name: 'Name',
          sortable: true,
        },
        {
          name: 'Mobile',
          sortable: false,
        },
        {
          name: 'Expiry',
          sortable: false,
        },
        {
          name: 'Penalty',
          sortable: false,
        },
      ]}
      sortableField={{
        name: 'Name',
        direction: Direction.UP,
      }}
      type={{
        name: 'radio',
      }}
    />
  );
}
