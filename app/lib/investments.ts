import { Player } from "../types/player";

export function investFD(player: Player, amount: number) {
  return {
    ...player,
    cash: player.cash - amount,
    investments: {
      ...player.investments,
      fd: player.investments.fd + amount,
    },
  };
}

export function matureFD(player: Player) {
  const returns = player.investments.fd * 0.1;
  return {
    ...player,
    cash: player.cash + player.investments.fd + returns,
    investments: { ...player.investments, fd: 0 },
  };
}
