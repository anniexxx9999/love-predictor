import { useMemo, useState, useCallback } from 'react'
import { Question, Answer, AssessmentResult } from '../types'

interface ResultSectionProps {
  questions: Question[]
  answers: Record<string, Answer>
  result: AssessmentResult
  onRestart: () => void
}

export function ResultSection({
  questions,
  answers,
  result,
  onRestart
}: ResultSectionProps) {
  // 分享菜单状态
  const [showShareMenu, setShowShareMenu] = useState(false)

  // 生成分享文本
  const shareText = useMemo(() => {
    return `我在恋爱契合度测试中获得了${result.totalScore}分！\n` +
           `分析结果：${result.analysis}\n` +
           `快来测试你们的契合度吧！`
  }, [result])

  // 复制分享文本
  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      alert('分享文本已复制到剪贴板！')
      setShowShareMenu(false)
    } catch {
      alert('复制失败，请手动复制。')
    }
  }, [shareText])

  // 分享到社交媒体
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '恋爱契合度测试结果',
          text: shareText,
          url: window.location.href
        })
        setShowShareMenu(false)
      } catch {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('分享失败:', err)
        }
      }
    } else {
      setShowShareMenu(true)
    }
  }, [shareText])

  // 计算完成率
  const completionRate = useMemo(() => {
    return Math.round((Object.keys(answers).length / questions.length) * 100)
  }, [answers, questions.length])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 总分展示 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          你们的契合度得分
        </h2>
        <div className="text-6xl font-bold text-primary animate-fade-in">
          {result.totalScore}
        </div>
        <p className="text-muted-foreground mt-2">
          基于{completionRate}%的问题完成度
        </p>
      </div>

      {/* 维度得分 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {Object.entries(result.dimensionScores).map(([dimension, score]) => (
          <div 
            key={dimension}
            className="p-6 rounded-lg bg-card"
          >
            <h3 className="text-lg font-semibold mb-2">{dimension}</h3>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-2 text-right text-sm text-muted-foreground">
              {score}%
            </div>
          </div>
        ))}
      </div>

      {/* 分析报告 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">分析报告</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground">{result.analysis}</p>
        </div>
      </div>

      {/* 建议列表 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">改善建议</h3>
        <ul className="space-y-4">
          {result.suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="flex items-start gap-4"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-muted-foreground">{suggestion}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 分享按钮区域 */}
      <div className="relative flex justify-center gap-4">
        <div className="relative">
          <button 
            onClick={handleShare}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            分享结果
          </button>

          {/* 分享菜单 */}
          {showShareMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-card rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleCopyText}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-colors"
              >
                复制分享文本
              </button>
              <a
                href={`https://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 text-left hover:bg-muted transition-colors"
                onClick={() => setShowShareMenu(false)}
              >
                分享到微博
              </a>
            </div>
          )}
        </div>

        <button 
          onClick={onRestart}
          className="px-6 py-2 rounded-lg bg-card hover:bg-muted transition-all"
        >
          重新测试
        </button>
      </div>

      {/* 点击外部关闭分享菜单 */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
} 