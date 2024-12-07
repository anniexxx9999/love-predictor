"use client"

import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'love-predictor-theme'

export function useTheme() {
  // 初始化主题状态
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 优先从localStorage读取
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      // 其次检查系统主题
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setIsDark(e.matches)
        updateTheme(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 更新DOM和localStorage
  const updateTheme = useCallback((dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [])

  // 切换主题
  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      updateTheme(newValue)
      return newValue
    })
  }, [updateTheme])

  return {
    isDark,
    toggleTheme
  }
} 