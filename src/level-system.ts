export interface Tier {
  tierIndex: number;
  startLevel: number;
  endLevel: number;
  expPerLevel: number;
}

export interface LevelInfo {
  level: number;
  totalExp: number;
  currentLevelExp: number;
  expForNextLevel: number;
  tier: Tier;
  stars: number;
}

export const TIERS: Tier[] = [
  { tierIndex: 0, startLevel: 1,  endLevel: 5,  expPerLevel: 100 },
  { tierIndex: 1, startLevel: 6,  endLevel: 10, expPerLevel: 300 },
  { tierIndex: 2, startLevel: 11, endLevel: 15, expPerLevel: 600 },
  { tierIndex: 3, startLevel: 16, endLevel: 20, expPerLevel: 1200 },
  { tierIndex: 4, startLevel: 21, endLevel: 30, expPerLevel: 3500 },
  { tierIndex: 5, startLevel: 31, endLevel: 40, expPerLevel: 8000 },
  { tierIndex: 6, startLevel: 41, endLevel: 50, expPerLevel: 15000 },
  { tierIndex: 7, startLevel: 51, endLevel: Infinity, expPerLevel: 25000 },
];

export function getLevelInfo(totalExp: number): LevelInfo {
  let remaining = totalExp;
  let level = 1;

  for (const tier of TIERS) {
    const levelsInTier = tier.endLevel === Infinity ? Infinity : tier.endLevel - tier.startLevel + 1;
    for (let i = 0; i < levelsInTier; i++) {
      if (remaining < tier.expPerLevel) {
        return {
          level,
          totalExp,
          currentLevelExp: remaining,
          expForNextLevel: tier.expPerLevel,
          tier: getTierForLevel(level),
          stars: getStars(level),
        };
      }
      remaining -= tier.expPerLevel;
      level++;
    }
  }

  return {
    level,
    totalExp,
    currentLevelExp: remaining,
    expForNextLevel: TIERS[7].expPerLevel,
    tier: TIERS[7],
    stars: getStars(level),
  };
}

function getTierForLevel(level: number): Tier {
  for (const tier of TIERS) {
    if (level >= tier.startLevel && level <= tier.endLevel) {
      return tier;
    }
  }
  return TIERS[7];
}

function getStars(level: number): number {
  const tier = getTierForLevel(level);
  const tierSize = tier.endLevel === Infinity ? 10 : tier.endLevel - tier.startLevel + 1;
  const positionInTier = level - tier.startLevel;
  if (tierSize <= 5) {
    return positionInTier + 1;
  }
  return Math.floor(positionInTier / 2) + 1;
}
