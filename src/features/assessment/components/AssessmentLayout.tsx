import { ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'

interface AssessmentLayoutProps {
  children: ReactNode
}

export function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">恋爱契合度测试</h1>
          {/* 后续添加主题切换和其他控制按钮 */}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Love Predictor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 