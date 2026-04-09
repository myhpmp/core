export function calcTokenExp(tokens: number): number {
  if (!Number.isFinite(tokens) || tokens < 0) return 0;
  return Math.floor(tokens / 1000);
}

export const DAILY_SESSION_CAP = 30;

export function calcSessionExp(dailySessionCount: number = 0): number {
  if (dailySessionCount >= DAILY_SESSION_CAP) return 0;
  return 25;
}

export function calcStreakBonus(streakDays: number): number {
  return Math.min(streakDays, 30) * 5;
}

export function calcWeeklyBonus(weeklyUsagePercent: number): number {
  return weeklyUsagePercent >= 70 ? 100 : 0;
}
