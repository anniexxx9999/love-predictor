import { useState, useCallback } from 'react'
import { Question, Answer } from '../types'

interface QuestionCardProps {
  question: Question
  currentAnswer?: Answer
  onAnswer: (answer: Answer) => void
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    currentAnswer?.selectedOptions[0] || ''
  )

  const handleOptionClick = useCallback((optionId: string) => {
    // 如果点击已选中的选项，不做任何处理
    if (selectedOption === optionId) return
    
    // 更新选中状态
    setSelectedOption(optionId)
    
    // 触发答案更新
    onAnswer({
      questionId: question.id,
      selectedOptions: [optionId] // 始终只包含一个选项
    })
  }, [selectedOption, question.id, onAnswer])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 题目标题 */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{question.title}</h3>
        {question.description && (
          <p className="text-muted-foreground">{question.description}</p>
        )}
      </div>

      {/* 选项列表 */}
      <div className="space-y-4">
        {question.options.map(option => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`
              w-full p-4 rounded-lg text-left transition-all
              ${
                selectedOption === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-muted'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {/* 单选按钮 */}
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  selectedOption === option.id
                    ? 'border-primary-foreground'
                    : 'border-muted-foreground'
                }
              `}>
                {selectedOption === option.id && (
                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                )}
              </div>
              
              {/* 选项文本 */}
              <span className="text-lg">{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            px-6 py-2 rounded-lg transition-all
            ${
              isFirst
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-muted'
            }
          `}
        >
          上一题
        </button>
        <button
          onClick={onNext}
          disabled={question.required && !selectedOption}
          className={`
            px-6 py-2 rounded-lg bg-primary text-primary-foreground transition-all
            ${
              question.required && !selectedOption
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary/90'
            }
          `}
        >
          {isLast ? '完成' : '下一题'}
        </button>
      </div>
    </div>
  )
} 