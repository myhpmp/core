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

## Git Workflow

**main 브랜치는 보호됨 — direct push 금지. 반드시 PR을 통해서만 merge.**

**PR 생성 전에 반드시 `/review` 를 실행하여 팀 리뷰를 통과해야 한다. 리뷰 없이 PR/merge/배포 금지.**

```
feature branch → `/review` 팀 리뷰 통과 → PR + merge 자동 → 사용자에게 태그 버전 확인 → npm 배포
```

1. **Branch**: `feat/`, `fix/`, `refactor/`, `docs/` prefix로 생성
2. **Commit**: Conventional Commits format (`feat:`, `fix:`, `refactor:`, etc.)
3. **PR**: CI 통과 필수 → squash merge
4. **Tag & Deploy**: 태그 기준에 따라 `v*` 태그 push → CI가 build + test + npm publish
5. **Branches**: merge 후 삭제

### 태그(배포) 기준

태그는 **사용자가 수동으로** push한다. CI는 태그를 감지하여 build + test + npm publish를 실행한다.

| 태그 | 언제 | 예시 |
|------|------|------|
| **patch** (v1.0.X) | 버그 수정, 사용자에게 영향 있는 fix | `fix:` 커밋 |
| **minor** (v1.X.0) | 새 API 추가, 동작 변경 (하위 호환) | `feat:` 커밋 |
| **major** (vX.0.0) | breaking change (기존 API 호환 깨짐) | CLI/web 동시 업데이트 필요 |
| **태그 안 함** | 코드 변경 없음 (docs, chore, config) | `docs:`, `chore:` 커밋 |

**절대 하지 말 것:**
- main에 직접 push
- CI 통과 전 merge
- 태그 없이 npm publish
- 코드 변경 없는 커밋에 태그 달기

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
