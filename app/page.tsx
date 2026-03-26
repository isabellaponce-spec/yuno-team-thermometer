'use client'
import { useState } from 'react'
import Welcome from '@/components/Welcome'
import TeamSelect from '@/components/TeamSelect'
import DimensionQuestion from '@/components/DimensionQuestion'
import OpenFeedback from '@/components/OpenFeedback'
import ThankYou from '@/components/ThankYou'
import { DIMENSIONS } from '@/lib/dimensions'
import type { SurveyState } from '@/lib/types'

const INITIAL_STATE: SurveyState = {
  step: 0,
  team: '',
  customTeam: '',
  responses: {},
  openFeedback: '',
}

// Steps:
// 0 = Welcome
// 1 = TeamSelect
// 2-10 = Dimension questions (index 0-8)
// 11 = OpenFeedback
// 12 = ThankYou

export default function Home() {
  const [state, setState] = useState<SurveyState>(INITIAL_STATE)

  const goToStep = (step: number) => setState(prev => ({ ...prev, step }))

  const handleTeamSelect = (team: string, customTeam: string) => {
    setState(prev => ({ ...prev, team, customTeam, step: 2 }))
  }

  const handleAnswer = (dimensionId: string, value: number) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, [dimensionId]: value },
      step: prev.step + 1,
    }))
  }

  const handleSubmit = (feedback: string) => {
    const payload = {
      team: state.customTeam || state.team,
      customTeam: state.customTeam || null,
      timestamp: new Date().toISOString(),
      responses: state.responses,
      openFeedback: feedback || null,
    }
    // TODO: Connect to backend/database for response storage
    console.log('Survey submitted:', JSON.stringify(payload, null, 2))
    setState(prev => ({ ...prev, openFeedback: feedback, step: 12 }))
  }

  const handleReset = () => setState(INITIAL_STATE)

  const { step } = state

  return (
    <main className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
      <div className="w-full max-w-lg">
        {step === 0 && <Welcome onStart={() => goToStep(1)} />}
        {step === 1 && <TeamSelect onSelect={handleTeamSelect} />}
        {step >= 2 && step <= 10 && (
          <DimensionQuestion
            key={step}
            dimension={DIMENSIONS[step - 2]}
            stepIndex={step - 2}
            totalSteps={11}
            onAnswer={(value) => handleAnswer(DIMENSIONS[step - 2].id, value)}
          />
        )}
        {step === 11 && <OpenFeedback onSubmit={handleSubmit} />}
        {step === 12 && <ThankYou onReset={handleReset} />}
      </div>
    </main>
  )
}
