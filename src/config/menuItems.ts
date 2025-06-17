
import {
  Home,
  MessageSquare,
  Users,
  User,
  Share,
  Wrench,
  TestTube
} from 'lucide-react';

export interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  items?: {
    title: string;
    url: string;
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
      },
      {
        title: "WhatsApp",
        url: "/marketing/whatsapp",
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
      },
      {
        title: "设置",
        url: "/ai-agent/settings",
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
      },
      {
        title: "自动建站霸屏",
        url: "/brand/seo",
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
      },
      {
        title: "落地页",
        url: "/tools/landing",
      },
      {
        title: "网红",
        url: "/tools/influencer",
      },
      {
        title: "广告助手",
        url: "/tools/ads",
      },
      {
        title: "竞品监控",
        url: "/tools/competitor",
      },
      {
        title: "流量加热",
        url: "/tools/traffic-boost",
      },
    ],
  },
  {
    title: "测试模块",
    url: "/test",
    icon: TestTube,
  },
];
