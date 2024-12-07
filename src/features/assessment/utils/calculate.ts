import { Question, Answer, AssessmentResult } from '../types'
import { DIMENSIONS } from './questions'

interface DimensionScore {
  score: number
  maxScore: number
  count: number
}

export function calculateResult(
  questions: Question[],
  answers: Record<string, Answer>
): AssessmentResult {
  // 初始化维度得分
  const dimensionScores: Record<string, DimensionScore> = {}
  Object.values(DIMENSIONS).forEach(dimension => {
    dimensionScores[dimension] = {
      score: 0,
      maxScore: 0,
      count: 0
    }
  })

  // 计算各维度得分
  questions.forEach(question => {
    const answer = answers[question.id]
    if (!answer) return

    const dimension = question.dimension
    const score = calculateQuestionScore(question, answer)
    const maxScore = calculateMaxScore(question)

    dimensionScores[dimension].score += score
    dimensionScores[dimension].maxScore += maxScore
    dimensionScores[dimension].count += 1
  })

  // 计算维度百分比得分
  const finalDimensionScores: Record<string, number> = {}
  Object.entries(dimensionScores).forEach(([dimension, data]) => {
    if (data.count > 0) {
      finalDimensionScores[dimension] = Math.round(
        (data.score / data.maxScore) * 100
      )
    } else {
      finalDimensionScores[dimension] = 0
    }
  })

  // 计算总分(各维度平均)
  const totalScore = Math.round(
    Object.values(finalDimensionScores).reduce((sum, score) => sum + score, 0) /
    Object.keys(finalDimensionScores).length
  )

  // 生成分析报告
  const analysis = generateAnalysis(finalDimensionScores)

  // 生成建议
  const suggestions = generateSuggestions(finalDimensionScores)

  return {
    totalScore,
    dimensionScores: finalDimensionScores,
    analysis,
    suggestions
  }
}

// 计算单题得分
function calculateQuestionScore(question: Question, answer: Answer): number {
  return answer.selectedOptions.reduce((score, optionId) => {
    const option = question.options.find(opt => opt.id === optionId)
    return score + (option?.value as number || 0)
  }, 0)
}

// 计算题目最高分
function calculateMaxScore(question: Question): number {
  if (question.type === 'single') {
    return Math.max(...question.options.map(opt => opt.value as number))
  } else {
    return question.options.reduce((sum, opt) => sum + (opt.value as number), 0)
  }
}

// 生成分析报告
function generateAnalysis(dimensionScores: Record<string, number>): string {
  const highScores = Object.entries(dimensionScores)
    .filter(([_, score]) => score >= 80)
    .map(([dimension]) => dimension)

  const lowScores = Object.entries(dimensionScores)
    .filter(([_, score]) => score < 60)
    .map(([dimension]) => dimension)

  let analysis = '根据测试结果分析,'

  if (highScores.length > 0) {
    analysis += `你们在${highScores.join('、')}等方面表现出较高的契合度。`
  }

  if (lowScores.length > 0) {
    analysis += `但在${lowScores.join('、')}等方面可能需要更多理解与包容。`
  }

  return analysis
}

// 生成建议
function generateSuggestions(dimensionScores: Record<string, number>): string[] {
  const suggestions: string[] = []

  Object.entries(dimensionScores).forEach(([dimension, score]) => {
    if (score < 60) {
      suggestions.push(getDimensionSuggestion(dimension))
    }
  })

  if (suggestions.length === 0) {
    suggestions.push('继续保持良好的沟通和理解')
  }

  return suggestions
}

// 获取维度建议
function getDimensionSuggestion(dimension: string): string {
  const suggestionMap: Record<string, string> = {
    [DIMENSIONS.PERSONALITY]: '尝试更多地理解和接纳对方的性格特点',
    [DIMENSIONS.LIFESTYLE]: '寻找能够共同享受的生活方式',
    [DIMENSIONS.VALUES]: '多交流彼此的人生观和价值观',
    [DIMENSIONS.COMMUNICATION]: '建立更有效的沟通方式',
    [DIMENSIONS.EMOTION]: '学习更好地表达和理解彼此的情感'
  }

  return suggestionMap[dimension] || '保持开放和包容的态度'
} 