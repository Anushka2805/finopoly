export type Card = {
  title: string;
  effect: (player: any) => any;
};

export const cards: Card[] = [
  {
    title: "Tax Refund 💸",
    effect: (p) => ({ ...p, cash: p.cash + 300 }),
  },
  {
    title: "Market Crash 📉",
    effect: (p) => ({ ...p, cash: p.cash - 400 }),
  },
  {
    title: "Side Hustle 💼",
    effect: (p) => ({ ...p, cash: p.cash + 250 }),
  },
];
