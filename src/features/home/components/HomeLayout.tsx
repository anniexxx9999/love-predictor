"use client"

import { useCallback } from 'react'
import { Header } from './Header'
import { Hero } from './Hero'
import { Features } from './Features'
import { Footer } from './Footer'
import { useTheme } from '../hooks/useTheme'

export function HomeLayout() {
  const { toggleTheme } = useTheme()

  // 开始测试处理
  const handleStartTest = useCallback(() => {
    // TODO: 跳转到测试页面
    console.log('开始测试')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header onThemeToggle={toggleTheme} />
      
      <main className="flex-1">
        <Hero onCtaClick={handleStartTest} />
        <Features />
      </main>

      <Footer />
    </div>
  )
} 