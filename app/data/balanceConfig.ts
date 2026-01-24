export const BALANCE = {
  SALARY: {
    NORMAL: 500,
    BONUS: 800,
  },

  BILLS: {
    SMALL: 200,
    MEDIUM: 300,
    HEAVY: 500,
  },

  INVESTMENTS: {
    FD_RETURN: 0.1,        // 10%
    STOCK_RETURN: 0.2,     // 20%
    STARTUP_RETURN: 0.5,   // 50%
    STARTUP_RISK: 0.5,     // 50% chance of loss
  },

  LOAN: {
    INTEREST_RATE: 0.05,   // 5% every 5 turns
    MAX_DEBT: 2000,
  },

  INSURANCE: {
    HEALTH_REDUCTION: 0.6, // reduces loss by 60%
    COST: 200,
  },

  PENALTIES: {
    NEGATIVE_CASH: 300,
    BANKRUPTCY_LIMIT: -500,
  },
};
