import { Direction } from 'react-component-library';
import { Table } from '../components/table';
import { companyDummyData } from '../data/dummy';

export function CompanyTable() {
  return (
    <Table
      data={companyDummyData}
      dataFields={[
        {
          name: 'BPN',
          sortable: false,
        },
        {
          name: 'Company Name',
          sortable: true,
        },
      ]}
      sortableField={{
        name: 'BPN',
        direction: Direction.UP,
      }}
      type={{
        name: 'checkbox',
      }}
    />
  );
}
