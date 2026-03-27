'use client'
import { useState } from 'react'
import Welcome from '@/components/Welcome'
import TeamSelect from '@/components/TeamSelect'
import DimensionQuestion from '@/components/DimensionQuestion'
import OpenFeedback from '@/components/OpenFeedback'
import RaiseConcern from '@/components/RaiseConcern'
import ThankYou from '@/components/ThankYou'
import { DIMENSIONS } from '@/lib/dimensions'
import type { SurveyState } from '@/lib/types'

const INITIAL_STATE: SurveyState = {
  step: 0,
  team: '',
  customTeam: '',
  responses: {},
  openFeedback: '',
  concern: {
    wantsConcern: false,
    concernName: '',
    concernText: '',
  },
}

// Steps:
// 0 = Welcome
// 1 = TeamSelect
// 2-10 = Dimension questions (index 0-8)
// 11 = OpenFeedback
// 12 = RaiseConcern
// 13 = ThankYou

async function submitSurvey(state: SurveyState) {
  const payload = {
    team: state.customTeam || state.team,
    customTeam: state.customTeam || null,
    responses: state.responses,
    openFeedback: state.openFeedback || null,
    concernName: state.concern.wantsConcern ? state.concern.concernName : null,
    concernText: state.concern.wantsConcern ? state.concern.concernText : null,
  }

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('Submit failed:', await res.text())
    }
  } catch (err) {
    console.error('Submit error:', err)
  }
}

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

  const handleFeedbackSubmit = (feedback: string) => {
    setState(prev => ({ ...prev, openFeedback: feedback, step: 12 }))
  }

  const handleConcernSubmit = async (concernName: string, concernText: string) => {
    const updated = {
      ...state,
      concern: { wantsConcern: true, concernName, concernText },
      step: 13,
    }
    setState(updated)
    await submitSurvey(updated)
  }

  const handleConcernSkip = async () => {
    const updated = { ...state, step: 13 }
    setState(updated)
    await submitSurvey(updated)
  }

  const handleReset = () => setState(INITIAL_STATE)

  const { step } = state

  return (
    <main className="min-h-screen bg-[#F8F9FC] bg-pattern flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-lg relative">
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
        {step === 11 && <OpenFeedback onSubmit={handleFeedbackSubmit} />}
        {step === 12 && <RaiseConcern onSubmit={handleConcernSubmit} onSkip={handleConcernSkip} />}
        {step === 13 && <ThankYou onReset={handleReset} />}
      </div>
    </main>
  )
}
