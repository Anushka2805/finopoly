export type Player = {
  id: number;
  name: string;
  position: number;
  cash: number;
  savings: number;
  debt: number;
  insurance: {
    health: boolean;
    market: boolean;
  };
  investments: {
    fd: number;
    stocks: number;
    startup: number;
  };
  isComputer: boolean;
};
