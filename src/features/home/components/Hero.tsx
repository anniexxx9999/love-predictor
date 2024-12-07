"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { type HeroProps } from '../types'

export function Hero({
  title = "预测你们的恋爱契合度",
  subtitle = "基于心理学和数据分析,帮助你找到最适合的伴侣",
  ctaText = "开始测试",
  onCtaClick,
  backgroundImage = "/images/hero-bg.svg"
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 鼠标移动视差效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // 计算鼠标位置相对于屏幕中心的偏移
      const moveX = (clientX - innerWidth / 2) / innerWidth
      const moveY = (clientY - innerHeight / 2) / innerHeight
      
      // 应用视差效果
      const elements = containerRef.current.querySelectorAll('.parallax')
      elements.forEach((el) => {
        const speed = el.getAttribute('data-speed') || '2'
        const x = moveX * parseInt(speed) * 50
        const y = moveY * parseInt(speed) * 50
        ;(el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16"
    >
      {/* 动态背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 基础渐变背景 */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background animate-pulse" />
        
        {/* 动态渐变球 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-primary/20 to-[#FF85A9]/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-r from-[#FF85A9]/20 to-primary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-primary/20 to-[#FF85A9]/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* 动态网格背景 */}
        <div className="absolute inset-0">
          {/* 主网格 */}
          <div 
            className="absolute inset-0 bg-grid-primary opacity-5 animate-grid"
            style={{ backgroundPosition: '0 0' }}
          />
          
          {/* 次级网格 - 错开效果 */}
          <div 
            className="absolute inset-0 bg-grid-secondary opacity-3 animate-grid-reverse"
            style={{ backgroundPosition: '10px 10px' }}
          />
          
          {/* 动态光斑 */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-full bg-gradient-radial from-primary/5 to-transparent animate-pulse" 
                 style={{ transform: 'scale(1.5)' }}
            />
          </div>
        </div>
        
        {/* 视差装饰元素 */}
        <div className="parallax absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" data-speed="3" />
        <div className="parallax absolute top-1/3 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" data-speed="2" />
        <div className="parallax absolute -bottom-20 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl" data-speed="4" />
      </div>

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in">
          <span className="inline-block hover:scale-105 transition-transform duration-300">
            {title.split('').map((char, i) => (
              <span 
                key={i}
                className="inline-block hover:text-primary transition-colors duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-16 max-w-2xl mx-auto animate-fade-in animation-delay-200 leading-relaxed hover:text-foreground transition-colors duration-300">
          {subtitle}
        </p>

        <button
          onClick={onCtaClick}
          className="
            group
            relative
            px-12 py-5 
            text-lg font-medium
            bg-gradient-to-r from-primary to-[#FF85A9]
            text-primary-foreground
            rounded-full
            transform hover:scale-105 
            transition-all duration-300
            shadow-lg hover:shadow-xl
            hover:shadow-primary/20
            animate-fade-in animation-delay-400
            overflow-hidden
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            {ctaText}
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF85A9] to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* 点击涟漪效果 */}
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute inset-0 rounded-full bg-white/30 animate-ripple" />
          </div>
        </button>
      </div>
    </section>
  )
} 