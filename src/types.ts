export interface Wallet {
  balance: number;
  investment: number;
  coins?: {[key: string]: number};
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  wallet: Wallet;
}

export interface Coin {
  name: string;
  id: string;
  avatar: string;
}

export interface Donation {
  username: string;
  amount: number;
  transId: string;
}

export interface FundTransfer {
  username: string;
  amount: number;
  transType: string;
  fee: number;
  donation: number;
  time: Date;
}

export interface Transaction {
  username: string;
  coinId: string;
  coinCount: number;
  cost: number;
  transType: string;
  fee: number;
  time: Date;
}

export interface StopLoss {
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
