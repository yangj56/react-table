import { CompanyTable } from '../data-components/company-table';
import { CustomerTable } from '../data-components/customer-table';
import { TelcoTable } from '../data-components/telco-table';

export default function TablePage() {
  return (
    <>
      <TelcoTable />
      <CustomerTable />
      <CompanyTable />
    </>
  );
}
