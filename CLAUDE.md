# @myhpmp/core

Shared core logic for My HP/MP — single source of truth for CLI and web dashboard.

## Project Overview

- **npm**: `@myhpmp/core`
- **Consumers**: `@myhpmp/cli` (CLI), `myhpmp/web` (Next.js dashboard)
- **Purpose**: Level system, EXP calculator, tier data, titles, emojis

## Code Conventions

- **Language**: TypeScript (strict mode)
- **Module**: ESM (`"type": "module"`, `.js` extensions in imports)
- **Naming**: kebab-case for files, camelCase for variables/functions
- **No `any`**: Use proper types
- **Exports**: All public API must be exported via `src/index.ts`
- **Pure logic only**: No I/O, no network, no file system, no dependencies

## Project Structure

```
src/
├── index.ts           # Public API re-exports
├── level-system.ts    # getLevelInfo, getTierForLevel, getStars, TIERS
├── exp-calculator.ts  # calcTokenExp, calcSessionExp, calcStreakBonus, calcWeeklyBonus
└── tier.ts            # TIER_EMOJIS, TIER_TITLES, getTierEmoji, getTierTitle
```

## Public API

```typescript
// Level system
getLevelInfo(totalExp: number): LevelInfo
getTierForLevel(level: number): Tier
getStars(level: number): number
TIERS: Tier[]

// EXP calculator
calcTokenExp(tokens: number): number      // floor(tokens / 1000)
calcSessionExp(): number                   // 25
calcStreakBonus(streakDays: number): number // min(days, 30) * 5
calcWeeklyBonus(usage: number): number     // usage >= 70 ? 100 : 0

// Tier data
getTierEmoji(tierIndex: number): string    // 0:🌱 1:⚔️ 2:🛡️ 3:🧙 4:🔮 5:👑 6:🐉 7:⚡
getTierTitle(tierIndex: number, locale: string): string
TIER_EMOJIS: Record<number, string>
TIER_TITLES: Record<number, TierTitle>
```

## Important Rules

- **No breaking changes** without major version bump — CLI and web depend on this
- **No dependencies** — this package must remain zero-dependency
- **No I/O** — pure computation only
- Changes here affect both CLI and web — test thoroughly
- Any new tier/title/emoji must be updated in `tier.ts`

## Git Conventions

- **Branch**: `feat/`, `fix/`, `refactor/` prefixes
- **Commit**: Conventional Commits format (`feat:`, `fix:`, `refactor:`, etc.)
- **PR**: squash merge to main
- **Deploy**: push `v*` tag → CI builds, tests, publishes to npm
- **Branches**: auto-deleted after merge

## Testing

- **Framework**: Vitest
- **Run**: `npm test` (passes with no test files via `--passWithNoTests`)
- Add tests when logic grows complex

## Level System Details

8 tiers with progressive EXP requirements:

| Tier | Levels | EXP/Level | Emoji | Title (ko) | Title (en) |
|------|--------|-----------|-------|------------|------------|
| 0 | 1-5 | 100 | 🌱 | 초보 모험가 | Novice Adventurer |
| 1 | 6-10 | 300 | ⚔️ | 견습 전사 | Apprentice Warrior |
| 2 | 11-15 | 600 | 🛡️ | 숙련 기사 | Skilled Knight |
| 3 | 16-20 | 1,200 | 🧙 | 마법사 | Mage |
| 4 | 21-30 | 3,500 | 🔮 | 대마법사 | Archmage |
| 5 | 31-40 | 8,000 | 👑 | 아크메이지 | Grand Archmage |
| 6 | 41-50 | 15,000 | 🐉 | 전설의 코드드래곤 | Legendary Code Dragon |
| 7 | 51+ | 25,000 | ⚡ | 초월자 | Transcendent |

Star calculation:
- Tier with ≤5 levels: `positionInTier + 1` (max 5 stars)
- Tier with >5 levels: `floor(positionInTier / 2) + 1` (max 5 stars)
