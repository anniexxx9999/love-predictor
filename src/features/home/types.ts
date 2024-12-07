export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  onThemeToggle: () => void;
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick: () => void;
  backgroundImage?: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

export interface FeaturesProps {
  features?: FeatureProps[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  items: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterProps {
  links?: FooterLinkGroup[];
  socialLinks?: SocialLink[];
} 