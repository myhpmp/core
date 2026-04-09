/** Tier emoji mapping (indexed by tierIndex) */
export const TIER_EMOJIS: Record<number, string> = {
  0: '🌱',
  1: '⚔️',
  2: '🛠️',
  3: '🏗️',
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
  0: { ko: '프롬프트 뉴비', en: 'Prompt Newbie', emoji: '🌱' },
  1: { ko: '토큰 익스플로러', en: 'Token Explorer', emoji: '⚔️' },
  2: { ko: '프롬프트 엔지니어', en: 'Prompt Engineer', emoji: '🛠️' },
  3: { ko: '컨텍스트 아키텍트', en: 'Context Architect', emoji: '🏗️' },
  4: { ko: '프롬프트 소서러', en: 'Prompt Sorcerer', emoji: '🔮' },
  5: { ko: '모델 마스터', en: 'Model Master', emoji: '👑' },
  6: { ko: '컨텍스트 오버로드', en: 'Context Overlord', emoji: '🐉' },
  7: { ko: '신서틱 마인드', en: 'Synthetic Mind', emoji: '⚡' },
};

export function getTierEmoji(tierIndex: number): string {
  return TIER_EMOJIS[tierIndex] ?? '🌱';
}

export function getTierTitle(tierIndex: number, locale: string): string {
  const title = TIER_TITLES[tierIndex];
  if (!title) return '';
  return locale === 'ko' ? title.ko : title.en;
}
