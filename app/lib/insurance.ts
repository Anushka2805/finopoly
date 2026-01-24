import { Player } from "../types/player";

export function buyHealthInsurance(player: Player) {
  return {
    ...player,
    insurance: { ...player.insurance, health: true },
  };
}

export function reduceMedicalLoss(player: Player, loss: number) {
  if (!player.insurance.health) return loss;
  return loss * 0.4;
}
