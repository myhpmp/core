/** Tier emoji mapping (indexed by tierIndex) */
export const TIER_EMOJIS: Record<number, string> = {
  0: '🌱',
  1: '⚔️',
  2: '🛡️',
  3: '🧙',
  4: '🔮',
  5: '👑',
  6: '🐉',
  7: '⚡',
};

/** Tier title keys (indexed by start level) */
export const TIER_TITLE_KEYS = [1, 6, 11, 16, 21, 31, 41, 51] as const;

export interface TierTitle {
  ko: string;
  en: string;
  emoji: string;
}

/** Complete tier title data */
export const TIER_TITLES: Record<number, TierTitle> = {
  0: { ko: '초보 모험가', en: 'Novice Adventurer', emoji: '🌱' },
  1: { ko: '견습 전사', en: 'Apprentice Warrior', emoji: '⚔️' },
  2: { ko: '숙련 기사', en: 'Skilled Knight', emoji: '🛡️' },
  3: { ko: '마법사', en: 'Mage', emoji: '🧙' },
  4: { ko: '대마법사', en: 'Archmage', emoji: '🔮' },
  5: { ko: '아크메이지', en: 'Grand Archmage', emoji: '👑' },
  6: { ko: '전설의 코드드래곤', en: 'Legendary Code Dragon', emoji: '🐉' },
  7: { ko: '초월자', en: 'Transcendent', emoji: '⚡' },
};

export function getTierEmoji(tierIndex: number): string {
  return TIER_EMOJIS[tierIndex] ?? '🌱';
}

export function getTierTitle(tierIndex: number, locale: string): string {
  const title = TIER_TITLES[tierIndex];
  if (!title) return '';
  return locale === 'ko' ? title.ko : title.en;
}
