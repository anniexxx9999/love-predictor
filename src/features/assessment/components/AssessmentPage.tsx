"use client"

import { useState, useCallback, useMemo } from 'react'
import { AssessmentLayout } from './AssessmentLayout'
import { QuestionCard } from './QuestionCard'
import { ProgressBar } from './ProgressBar'
import { ResultSection } from './ResultSection'
import { useAssessment } from '../hooks/useAssessment'
import { calculateResult } from '../utils/calculate'
import { questions } from '../utils/questions'

export function AssessmentPage() {
  const {
    state,
    saveAnswer,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    restartTest,
    currentQuestion
  } = useAssessment(questions)

  // 计算结果
  const result = useMemo(() => {
    if (!state.isComplete) return null
    return calculateResult(questions, state.answers)
  }, [state.isComplete, state.answers])

  return (
    <AssessmentLayout>
      {!state.isComplete ? (
        <>
          {/* 进度条 */}
          <ProgressBar
            questions={questions}
            currentIndex={state.currentQuestionIndex}
            answers={state.answers}
            onJumpTo={jumpToQuestion}
          />

          {/* 题目卡片 */}
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              currentAnswer={state.answers[currentQuestion.id]}
              onAnswer={saveAnswer}
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              isFirst={state.currentQuestionIndex === 0}
              isLast={state.currentQuestionIndex === questions.length - 1}
            />
          )}
        </>
      ) : (
        result && (
          <ResultSection
            questions={questions}
            answers={state.answers}
            result={result}
            onRestart={restartTest}
          />
        )
      )}
    </AssessmentLayout>
  )
} 