// 定义核心类型
export interface Question {
  id: string
  type: 'single' // 移除multiple选项，只保留single
  title: string
  description?: string
  options: Option[]
  required?: boolean
  dimension: string
}

export interface Option {
  id: string
  text: string
  value: string | number
}

export interface Answer {
  questionId: string
  selectedOptions: string[] // 选中的选项ID数组
}

export interface AssessmentState {
  currentQuestionIndex: number
  answers: Record<string, Answer>
  isComplete: boolean
  startTime?: Date
  endTime?: Date
}

export interface AssessmentResult {
  totalScore: number
  dimensionScores: Record<string, number>
  analysis: string
  suggestions: string[]
} 