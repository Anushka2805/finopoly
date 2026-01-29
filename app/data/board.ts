export type TileType =
  | "salary"
  | "investment"
  | "risk"
  | "bills"
  | "bank"
  | "bonus"
  | "insurance";

export type BoardTile = {
  id: number;
  type: TileType;
  label: string;
};

export const board: BoardTile[] = [
  { id: 0, type: "salary", label: "Salary Day" },
  { id: 1, type: "investment", label: "Fixed Deposit" },
  { id: 2, type: "risk", label: "Market Crash" },
  { id: 3, type: "bills", label: "Electricity Bill" },
  { id: 4, type: "bank", label: "Bank Visit" },
  { id: 5, type: "insurance", label: "Health Insurance" },

  { id: 6, type: "salary", label: "Freelance Income" },
  { id: 7, type: "investment", label: "Stock Market" },
  { id: 8, type: "risk", label: "Medical Emergency" },
  { id: 9, type: "bills", label: "Rent Payment" },
  { id: 10, type: "bonus", label: "Cashback Reward" },
  { id: 11, type: "bank", label: "Loan Office" },

  { id: 12, type: "salary", label: "Bonus Salary" },
  { id: 13, type: "investment", label: "Startup Investment" },
  { id: 14, type: "risk", label: "Market Volatility" },
  { id: 15, type: "bills", label: "Tax Payment" },
  { id: 16, type: "insurance", label: "Market Insurance" },
  { id: 17, type: "bonus", label: "Festival Bonus" },

  { id: 18, type: "salary", label: "Side Hustle" },
  { id: 19, type: "investment", label: "FD Maturity" },
  { id: 20, type: "risk", label: "Unexpected Expense" },
  { id: 21, type: "bank", label: "Savings Account" },
  { id: 22, type: "bonus", label: "Lucky Draw" },
  { id: 23, type: "bills", label: "Maintenance Fee" },
];
