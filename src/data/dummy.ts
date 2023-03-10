import {
  TelcoInterface,
  CustomerInterface,
  CompanyInterface,
} from './interface';

export const telcoDummyData: TelcoInterface[] = [
  {
    name: '*Celcom Axiata (LTE)',
    headset: 'CELCOM / My Celcom / 502 19',
    has3G: true,
  },
  {
    name: '*DiGi Telecom (LTE)',
    headset: 'DiGi 1800 / DiGi /  MYMY18',
    has3G: true,
  },
  {
    name: '*Maxis (LTE)',
    headset: 'U Mobile / MYS 18 / MY 18',
    has3G: true,
  },
  {
    name: 'U Mobile (LTE)',
    headset: 'U Mobile / MYS 18 / MY 18',
    has3G: true,
  },
];

export const customerDummydata: CustomerInterface[] = [
  {
    name: 'Mavis Chen',
    mobile: '8899 7654',
    expiry: 'Dec 2022',
    penalty: 600,
  },
  {
    name: 'Rodney Artichoke',
    mobile: '9988 7676',
    expiry: 'Dec 2022',
    penalty: 600,
  },
  {
    name: 'Valentino Morose',
    mobile: '8900 7654',
    expiry: 'Dec 2022',
    penalty: 300,
  },
  {
    name: 'Eric Widget',
    mobile: '8900 7654',
    expiry: 'Dec 2022',
    penalty: 300,
  },
];

export const companyDummyData: CompanyInterface[] = [
  {
    BRN: '198702333K',
    name: 'Blue Ocean International',
  },
  {
    BRN: '198900364N',
    name: 'Red Electronics',
  },
  {
    BRN: '196700335H',
    name: 'Yellow Gaming',
  },
  {
    BRN: '196800306E',
    name: 'Purple Automobiles',
  },
  {
    BRN: '199131124V',
    name: 'Diamond Interiors Holdings',
  },
  {
    BRN: '200201624D',
    name: 'Omnichannel Solutions International',
  },
];
