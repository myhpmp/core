export function calcTokenExp(tokens: number): number {
  if (!Number.isFinite(tokens) || tokens < 0) return 0;
  return Math.floor(tokens / 1000);
}

export function calcStreakBonus(streakDays: number): number {
  return Math.min(streakDays, 30) * 5;
}

