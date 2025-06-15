
import React from 'react';
import { Package, Cpu, Sparkles, Building, Tag, Newspaper, Globe, FileText } from 'lucide-react';

export const tagCategories: { [key: string]: string } = {
  // Products
  'A100': 'product',
  'B200': 'product',
  '智能音箱': 'product',
  '智能门锁': 'product',
  
  // Technology
  'AI技术': 'technology',
  '智能家居': 'technology',
  '技术规格': 'technology',
  '多重认证': 'technology',

  // Feature
  '新品发布': 'feature',
  '产品说明': 'feature',
  '安装指南': 'feature',
  '创新': 'feature',
  
  // Corporate
  '公司介绍': 'corporate',
  '发展历程': 'corporate',
  '企业文化': 'corporate',

  // Sources
  '新闻': 'news_source',
  '官网': 'website_source',
  '文件': 'file_source',
};

export const categoryStyles: {
  [key: string]: {
    icon: React.ElementType;
    color: string;
    iconColor: string;
  }
} = {
  product: {
    icon: Package,
    color: 'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200',
    iconColor: 'text-blue-600',
  },
  technology: {
    icon: Cpu,
    color: 'border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-200',
    iconColor: 'text-purple-600',
  },
  feature: {
    icon: Sparkles,
    color: 'border-green-200 bg-green-100 text-green-800 hover:bg-green-200',
    iconColor: 'text-green-600',
  },
  corporate: {
    icon: Building,
    color: 'border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-200',
    iconColor: 'text-orange-600',
  },
  news_source: {
    icon: Newspaper,
    color: 'border-green-200 bg-green-100 text-green-800 hover:bg-green-200',
    iconColor: 'text-green-600',
  },
  website_source: {
    icon: Globe,
    color: 'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200',
    iconColor: 'text-blue-600',
  },
  file_source: {
    icon: FileText,
    color: 'border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-200',
    iconColor: 'text-purple-600',
  },
  default: {
    icon: Tag,
    color: 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200',
    iconColor: 'text-gray-500',
  },
};

export const getTagStyle = (tagName: string) => {
  const category = tagCategories[tagName] || 'default';
  return categoryStyles[category as keyof typeof categoryStyles];
};
