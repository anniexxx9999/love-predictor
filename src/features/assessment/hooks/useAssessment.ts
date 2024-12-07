"use client"

import { useState, useCallback, useEffect } from 'react'
import { AssessmentState, Answer, Question } from '../types'

// 本地存储key
const STORAGE_KEY = 'love-predictor-assessment'

export function useAssessment(questions: Question[]) {
  // 从本地存储初始化状态
  const [state, setState] = useState<AssessmentState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse saved assessment:', e)
        }
      }
    }
    return {
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false
    }
  })

  // 状态变化时保存到本地存储
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  // 保存答案
  const saveAnswer = useCallback((answer: Answer) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [answer.questionId]: answer
      }
    }))
  }, [])

  // 下一题
  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestionIndex >= questions.length - 1) {
        return { ...prev, isComplete: true }
      }
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }
    })
  }, [questions.length])

  // 上一题
  const previousQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
      isComplete: false // 确保可以返回修改答案
    }))
  }, [])

  // 跳转到指定题目
  const jumpToQuestion = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, questions.length - 1)),
      isComplete: false
    }))
  }, [questions.length])

  // 重新开始测试
  const restartTest = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false
    })
    // 清除本地存储
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // 获取当前进度
  const progress = {
    current: state.currentQuestionIndex + 1,
    total: questions.length,
    percentage: Math.round(((state.currentQuestionIndex + 1) / questions.length) * 100)
  }

  return {
    state,
    setState,
    saveAnswer,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    restartTest,
    progress,
    currentQuestion: questions[state.currentQuestionIndex]
  }
} 