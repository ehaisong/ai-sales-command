
import {
  Home,
  MessageSquare,
  Users,
  User,
  Share,
  Wrench,
  TestTube,
  Mail,
  MessageCircle,
  Database,
  Settings,
  Facebook,
  Search,
  UserCheck,
  FileText,
  Eye,
  TrendingUp,
  Zap
} from 'lucide-react';

export interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  items?: {
    title: string;
    url: string;
    icon?: any;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    title: "首页",
    url: "/",
    icon: Home,
  },
  {
    title: "营销对话",
    icon: MessageSquare,
    items: [
      {
        title: "电子邮件",
        url: "/marketing/email",
        icon: Mail,
      },
      {
        title: "WhatsApp",
        url: "/marketing/whatsapp",
        icon: MessageCircle,
      },
    ],
  },
  {
    title: "客户管理",
    url: "/customers",
    icon: Users,
  },
  {
    title: "AI业务员",
    icon: User,
    items: [
      {
        title: "品牌知识库",
        url: "/ai-agent/knowledge",
        icon: Database,
      },
      {
        title: "设置",
        url: "/ai-agent/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "品牌建设",
    icon: Share,
    items: [
      {
        title: "社交媒体",
        url: "/brand/social-media",
        icon: Facebook,
      },
      {
        title: "自动建站霸屏",
        url: "/brand/seo",
        icon: Search,
      },
    ],
  },
  {
    title: "营销工具",
    icon: Wrench,
    items: [
      {
        title: "爆款趋势",
        url: "/tools/trends",
        icon: TrendingUp,
      },
      {
        title: "落地页",
        url: "/tools/landing",
        icon: FileText,
      },
      {
        title: "网红",
        url: "/tools/influencer",
        icon: UserCheck,
      },
      {
        title: "广告助手",
        url: "/tools/ads",
        icon: MessageSquare,
      },
      {
        title: "竞品监控",
        url: "/tools/competitor",
        icon: Eye,
      },
      {
        title: "流量加热",
        url: "/tools/traffic-boost",
        icon: Zap,
      },
    ],
  },
  {
    title: "测试模块",
    url: "/test",
    icon: TestTube,
  },
];
