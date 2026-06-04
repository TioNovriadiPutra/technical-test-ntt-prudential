export type UserHairDTO = {
  color: string;
  type: string;
};

export type UserAddressCoorDTO = {
  lat: number;
  lng: number;
};

export type UserAddressDTO = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: UserAddressCoorDTO;
  country: "United States";
};

export type UserBankDTO = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type UserCompanyAddressDTO = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: UserAddressCoorDTO;
  country: string;
};

export type UserCompanyDTO = {
  department: string;
  name: string;
  title: string;
  address: UserCompanyAddressDTO;
};

export type UserCryptoDTO = {
  coin: "Bitcoin";
  wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a";
  network: "Ethereum (ERC20)";
};

export type UserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: UserHairDTO;
  ip: string;
  address: UserAddressDTO;
  macAddress: string;
  university: string;
  bank: UserBankDTO;
  company: UserCompanyDTO;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: UserCryptoDTO;
  role: string;
};
