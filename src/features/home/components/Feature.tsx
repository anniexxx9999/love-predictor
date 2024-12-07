import Image from 'next/image'
import { type FeatureProps } from '../types'

export function Feature({ 
  title, 
  description, 
  icon,
  index = 0 
}: FeatureProps) {
  return (
    <div 
      className="
        flex flex-col items-center text-center p-6 
        rounded-2xl bg-foreground/5 
        hover:bg-foreground/10 
        transition-all duration-300
        animate-fade-in
      "
      style={{ 
        animationDelay: `${index * 200}ms` 
      }}
    >
      <div className="w-16 h-16 mb-6 relative">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  )
} 