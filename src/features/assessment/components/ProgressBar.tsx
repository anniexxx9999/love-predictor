import { useMemo } from 'react'
import { Question, Answer } from '../types'

interface ProgressBarProps {
  questions: Question[]
  currentIndex: number
  answers: Record<string, Answer>
  onJumpTo: (index: number) => void
}

export function ProgressBar({
  questions,
  currentIndex,
  answers,
  onJumpTo
}: ProgressBarProps) {
  // 计算总体进度
  const progress = useMemo(() => {
    const answeredCount = Object.keys(answers).length
    return Math.round((answeredCount / questions.length) * 100)
  }, [answers, questions.length])

  // 计算预计剩余时间(假设每题平均1分钟)
  const estimatedTime = useMemo(() => {
    const remainingQuestions = questions.length - Object.keys(answers).length
    return Math.max(remainingQuestions, 0)
  }, [questions.length, answers])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* 进度条 */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 进度信息 */}
      <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground">
        <div>
          进度: {currentIndex + 1} / {questions.length}
        </div>
        <div>
          完成度: {progress}%
        </div>
        <div>
          预计剩余时间: {estimatedTime} 分钟
        </div>
      </div>

      {/* 题目导航 */}
      <div className="flex flex-wrap gap-2">
        {questions.map((_, index) => {
          const isAnswered = answers[questions[index].id]
          const isCurrent = index === currentIndex

          return (
            <button
              key={index}
              onClick={() => onJumpTo(index)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm
                transition-all
                ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isAnswered
                    ? 'bg-muted text-foreground'
                    : 'bg-card text-muted-foreground'
                }
                hover:opacity-80
              `}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
} 