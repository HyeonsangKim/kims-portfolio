import type { Locale } from '@/lib/i18n'

export type AwardKind = 'paper' | 'hackathon' | 'recognition'

export type AwardBadge =
  | 'paper-accepted'
  | 'grand-prize'
  | '2nd-place'
  | 'top-3'
  | 'participated'

export interface Award {
  id: string
  kind: AwardKind
  badge: AwardBadge
  /** Event name — kept English-first (proper noun). */
  event: string
  organizer: string
  result: Record<Locale, string>
  /** YYYY or YYYY-MM. */
  date: string
  /** Project slug for cross-link to FeaturedProjects card. */
  projectSlug?: string
  /** Optional external press / news link. */
  link?: { url: string; label: string }
}

export const awards: Award[] = [
  {
    id: 'acl-2026-wigvo',
    kind: 'paper',
    badge: 'paper-accepted',
    event: 'ACL 2026',
    organizer: 'Association for Computational Linguistics',
    result: {
      ko: 'WIGVO — System Demonstrations 채택',
      en: 'WIGVO — System Demonstrations Accepted',
      ja: 'WIGVO — System Demonstrations 採択',
    },
    date: '2026',
    projectSlug: 'wigvo',
  },
  {
    id: 'snowflake-2026-flake',
    kind: 'hackathon',
    badge: '2nd-place',
    event: 'Snowflake AI & Data Hackathon Korea 2026',
    organizer: 'Snowflake',
    result: {
      ko: 'WIGTN FLAKE — Tech Track Top 3 (2위)',
      en: 'WIGTN FLAKE — Tech Track Top 3 (2nd Place)',
      ja: 'WIGTN FLAKE — Tech Track Top 3（2位）',
    },
    date: '2026',
    projectSlug: 'wigtnflake',
    link: {
      url: 'https://www.newswire.co.kr/newsRead.php?no=1033575',
      label: 'News',
    },
  },
  {
    id: 'trae-2026-wigent',
    kind: 'hackathon',
    badge: 'grand-prize',
    event: 'Build with TRAE Seoul',
    organizer: 'ByteDance',
    result: {
      ko: 'WIGENT — 대상 (Grand Prize)',
      en: 'WIGENT — Grand Prize',
      ja: 'WIGENT — 大賞（Grand Prize）',
    },
    date: '2026-03',
    projectSlug: 'wigent',
  },
]

export const badgeStyleMap: Record<AwardBadge, string> = {
  'paper-accepted': 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  'grand-prize': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  '2nd-place': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  'top-3': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  'participated': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
}

export const badgeLabelMap: Record<AwardBadge, Record<Locale, string>> = {
  'paper-accepted': { ko: 'PAPER', en: 'PAPER', ja: 'PAPER' },
  'grand-prize': { ko: 'GRAND PRIZE', en: 'GRAND PRIZE', ja: 'GRAND PRIZE' },
  '2nd-place': { ko: '2ND PLACE', en: '2ND PLACE', ja: '2ND PLACE' },
  'top-3': { ko: 'TOP 3', en: 'TOP 3', ja: 'TOP 3' },
  'participated': { ko: 'PARTICIPATED', en: 'PARTICIPATED', ja: 'PARTICIPATED' },
}

/**
 * Now-unused asset paths that the awards data previously referenced. Kept as
 * a list so the public/images/awards/ folder isn't accidentally pruned by a
 * future cleanup before the assets are wired into another surface.
 *
 * - /images/awards/wigvo_logo.png
 * - /images/awards/Gemini3_seoul_hackthon.jpg
 * - /images/awards/timelens_hero.png
 */
