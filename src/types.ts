export interface Wallet {
  balance: number;
  investment: number;
  coins?: {[key: string]: number};
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  wallet: Wallet;
}

export interface Coin {
  _id: string;
  name: string;
  id: string;
  avatar: string;
}

export interface Donation {
  _id: string;
  username: string;
  amount: number;
  transId: string;
}

export interface FundTransfer {
  _id: string;
  username: string;
  amount: number;
  transType: string;
  fee: number;
  donation: number;
  time: Date;
}

export interface Transaction {
  _id: string;
  username: string;
  coinId: string;
  coinCount: number;
  cost: number;
  transType: string;
  fee: number;
  time: Date;
}

export interface StopLoss {
  _id: string;
  username: string;
  isEnabled: boolean;
  coinId: string;
  transType: string;
  condition: string;
  price: number;
  count: number;
  orderId?: string | null;
  placeTime: Date;
}

export interface WazirxTransaction {
  _id: string;
  username: string;
  id: string;
  status: string;
  receipt: any;
  remarks: string;
}

export interface UserCred {
  email: string;
  password: string;
}
