export interface TelcoInterface {
  name: string;
  headset: string;
  has3G: boolean;
}

export interface CustomerInterface {
  name: string;
  mobile: string;
  expiry: string;
  penalty: number;
}

export interface CompanyInterface {
  BRN: string;
  name: string;
}
