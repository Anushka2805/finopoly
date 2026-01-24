export const SAMPLE_PLAYTHROUGH = [
  {
    turn: 1,
    player: "Player 1",
    dice: 4,
    tile: "Salary Day",
    action: "Collect Salary",
    result: "Cash +₹500",
    state: {
      cash: 1500,
      savings: 300,
      debt: 0,
    },
  },
  {
    turn: 2,
    player: "Player 1",
    dice: 3,
    tile: "Startup Investment",
    action: "Invest ₹300",
    result: "Successful Startup → +₹600",
    state: {
      cash: 1800,
      savings: 300,
      debt: 0,
    },
  },
  {
    turn: 3,
    player: "Player 1",
    dice: 2,
    tile: "Medical Emergency",
    action: "Insurance Applied",
    result: "Loss reduced to ₹160",
    state: {
      cash: 1640,
      savings: 300,
      debt: 0,
    },
  },
];
