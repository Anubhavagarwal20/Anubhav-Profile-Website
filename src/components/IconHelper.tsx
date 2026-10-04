import React from 'react';
import {
  Search,
  Bot,
  Network,
  TrendingUp,
  ShoppingBag,
  FileText,
  Share2,
  Globe,
  Palette,
  Key,
  ShieldCheck,
  PieChart,
  Target,
  BarChart3,
  Sparkles,
  Cpu,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Download,
  Layers,
  Award,
  GraduationCap,
  X,
  Briefcase,
  Clock,
  MapPin,
  Sparkle,
  ArrowDown,
  Send,
  Eye,
  BarChart2,
  Zap,
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const iconProps = { className, size };

  switch (name.toLowerCase()) {
    case 'search':
      return <Search {...iconProps} />;
    case 'bot':
      return <Bot {...iconProps} />;
    case 'network':
      return <Network {...iconProps} />;
    case 'trendingup':
      return <TrendingUp {...iconProps} />;
    case 'shoppingbag':
      return <ShoppingBag {...iconProps} />;
    case 'filetext':
      return <FileText {...iconProps} />;
    case 'share2':
      return <Share2 {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'palette':
      return <Palette {...iconProps} />;
    case 'key':
      return <Key {...iconProps} />;
    case 'shieldcheck':
      return <ShieldCheck {...iconProps} />;
    case 'piechart':
      return <PieChart {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'barchart3':
      return <BarChart3 {...iconProps} />;
    case 'barchart2':
      return <BarChart2 {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'sparkle':
      return <Sparkle {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'award':
      return <Award {...iconProps} />;
    case 'graduationcap':
      return <GraduationCap {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'mappin':
      return <MapPin {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export {
  Search,
  Bot,
  Network,
  TrendingUp,
  ShoppingBag,
  FileText,
  Share2,
  Globe,
  Palette,
  Key,
  ShieldCheck,
  PieChart,
  Target,
  BarChart3,
  BarChart2,
  Sparkles,
  Cpu,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Download,
  Layers,
  Award,
  GraduationCap,
  X,
  Briefcase,
  Clock,
  MapPin,
  Sparkle,
  ArrowDown,
  Send,
  Eye,
  Zap,
};
