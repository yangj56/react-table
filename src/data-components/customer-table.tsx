import { Direction } from 'react-component-library';
import { customerDummydata } from '../data/dummy';
import { Table } from '../components/table';

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
          sortable: true,
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
        selectKey: 'Name',
      }}
    />
  );
}
