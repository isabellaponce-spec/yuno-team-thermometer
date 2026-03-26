export interface SurveyState {
  step: number
  team: string
  customTeam: string
  responses: {
    direction?: number
    accountability?: number
    motivation?: number
    externalOrientation?: number
    innovationLearning?: number
    teamDynamicsTrust?: number
    leadership?: number
    mentorship?: number
    apprenticeship?: number
  }
  openFeedback: string
}

export interface Dimension {
  id: string
  emoji: string
  name: string
  statement: string
}
