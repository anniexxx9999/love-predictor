import { type FeaturesProps } from '../types'
import { Feature } from './Feature'

export function Features({ features = defaultFeatures }: FeaturesProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in">
          为什么选择我们?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={feature.title} 
              {...feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const defaultFeatures = [
  {
    title: "科学的测评系统",
    description: "基于心理学理论和大数据分析,提供准确的契合度评估",
    icon: "/icons/science.svg"
  },
  {
    title: "快速便捷",
    description: "仅需5分钟,即可完成全部测试,获得专业报告",
    icon: "/icons/speed.svg"
  },
  {
    title: "深度洞察",
    description: "从多个维度分��你们的关系,提供个性化建议",
    icon: "/icons/insight.svg"
  },
  {
    title: "隐私保护",
    description: "严格的数据加密和隐私保护机制,确保信息安全",
    icon: "/icons/privacy.svg"
  },
  {
    title: "持续追踪",
    description: "定期评估关系变化,帮助你们更好地维护感情",
    icon: "/icons/track.svg"
  },
  {
    title: "专家支持",
    description: "专业情感咨询师提供建议,助你经营更好的关系",
    icon: "/icons/expert.svg"
  }
] 