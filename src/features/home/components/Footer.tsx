import Link from 'next/link'
import Image from 'next/image'
import { type FooterProps } from '../types'

export function Footer({ 
  links = defaultLinks,
  socialLinks = defaultSocialLinks 
}: FooterProps) {
  return (
    <footer className="bg-card text-card-foreground py-16">
      <div className="container mx-auto px-4">
        {/* 链接分组 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href}
                      className="text-card-foreground/70 hover:text-card-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-card-foreground/10 my-8" />

        {/* 底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* 版权信息 */}
          <p className="text-card-foreground/70 text-sm">
            © 2024 Love Predictor. All rights reserved.
          </p>

          {/* 社交媒体链接 */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-card-foreground/70 hover:text-card-foreground transition-colors"
                aria-label={link.platform}
              >
                <Image
                  src={link.icon}
                  alt={link.platform}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

const defaultLinks = [
  {
    title: "产品",
    items: [
      { label: "功能介绍", href: "/features" },
      { label: "使用指南", href: "/guide" },
      { label: "定价", href: "/pricing" },
      { label: "常见问题", href: "/faq" },
    ]
  },
  {
    title: "资源",
    items: [
      { label: "博客", href: "/blog" },
      { label: "案例分享", href: "/cases" },
      { label: "帮助中心", href: "/help" },
      { label: "API文档", href: "/api" },
    ]
  },
  {
    title: "关于",
    items: [
      { label: "关于我们", href: "/about" },
      { label: "联系我们", href: "/contact" },
      { label: "加入我们", href: "/jobs" },
      { label: "合作伙伴", href: "/partners" },
    ]
  },
  {
    title: "法律",
    items: [
      { label: "隐私政策", href: "/privacy" },
      { label: "服务条款", href: "/terms" },
      { label: "免责声明", href: "/disclaimer" },
      { label: "Cookie政策", href: "/cookies" },
    ]
  },
]

const defaultSocialLinks = [
  {
    platform: "微博",
    href: "https://weibo.com",
    icon: "/icons/weibo.svg"
  },
  {
    platform: "微信",
    href: "https://wechat.com",
    icon: "/icons/wechat.svg"
  },
  {
    platform: "知乎",
    href: "https://zhihu.com",
    icon: "/icons/zhihu.svg"
  },
  {
    platform: "GitHub",
    href: "https://github.com",
    icon: "/icons/github.svg"
  }
] 