"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type HeaderProps } from '../types'

export function Header({
  logo = "/logo.svg",
  navItems = [
    { label: "首页", href: "/" },
    { label: "关于", href: "/about" },
    { label: "博客", href: "/blog" },
    { label: "联系", href: "/contact" },
  ],
  onThemeToggle
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8 dark:invert"
            />
            <span className="font-bold text-xl gradient-text">
              Love Predictor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-foreground/10 transition-colors ring-1 ring-foreground/10"
              aria-label="切换主题"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            aria-label="菜单"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-foreground/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                onThemeToggle()
                setIsMenuOpen(false)
              }}
              className="flex items-center w-full py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              切换主题
            </button>
          </nav>
        )}
      </div>
    </header>
  )
} 