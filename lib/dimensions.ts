import type { Dimension } from './types'

export const DIMENSIONS: Dimension[] = [
  {
    id: 'direction',
    emoji: '🧭',
    name: 'Direction',
    statement: 'My team has a clear, shared understanding of our goals and priorities.',
  },
  {
    id: 'accountability',
    emoji: '✅',
    name: 'Accountability',
    statement: 'Roles and responsibilities are well-defined, and we hold each other accountable.',
  },
  {
    id: 'motivation',
    emoji: '🔥',
    name: 'Motivation',
    statement: 'I feel energized and committed to the work my team is doing.',
  },
  {
    id: 'externalOrientation',
    emoji: '🌍',
    name: 'External Orientation',
    statement: 'My team actively engages with stakeholders and other teams to deliver value.',
  },
  {
    id: 'innovationLearning',
    emoji: '💡',
    name: 'Innovation & Learning',
    statement: 'We encourage new ideas, experimentation, and learning from mistakes.',
  },
  {
    id: 'teamDynamicsTrust',
    emoji: '🤝',
    name: 'Team Dynamics & Trust',
    statement: 'I feel safe to speak up, share ideas, and have honest conversations in my team.',
  },
  {
    id: 'leadership',
    emoji: '👑',
    name: 'Leadership',
    statement: "Our team's leadership effectively guides us and creates conditions for success.",
  },
  {
    id: 'mentorship',
    emoji: '🧑‍🏫',
    name: 'Mentorship',
    statement: 'Experienced team members actively guide and support the growth of others.',
  },
  {
    id: 'apprenticeship',
    emoji: '🛠️',
    name: 'Apprenticeship',
    statement: 'There are real opportunities to learn hands-on by working alongside senior colleagues.',
  },
]

export const SCALE_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
}
