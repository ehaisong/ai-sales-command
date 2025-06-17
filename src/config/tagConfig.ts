
import React from 'react';

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

  // Customer Status Tags
  '已签约客户': 'client',
  '谈判中客户': 'negotiating',
  '意向客户': 'prospect',
  '冷客户': 'cold',

  // Customer Value Tags
  '高价值': 'high-value',
  'VIP': 'high-value',
  '新客户': 'new-customer',
  '潜在客户': 'potential',
  '流失客户': 'lost',
  '高学历': 'educated',
  '大客户': 'major-client',
};

export const categoryStyles: {
  [key: string]: {
    color: string;
  }
} = {
  product: {
    color: 'border-monday-blue/30 bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20 shadow-monday-blue/10 shadow-sm',
  },
  technology: {
    color: 'border-monday-purple/30 bg-monday-purple/10 text-monday-purple hover:bg-monday-purple/20 shadow-monday-purple/10 shadow-sm',
  },
  feature: {
    color: 'border-monday-green/30 bg-monday-green/10 text-monday-green hover:bg-monday-green/20 shadow-monday-green/10 shadow-sm',
  },
  corporate: {
    color: 'border-monday-orange/30 bg-monday-orange/10 text-monday-orange hover:bg-monday-orange/20 shadow-monday-orange/10 shadow-sm',
  },
  // Customer Status Categories - Monday.com style
  client: {
    color: 'border-monday-green/40 bg-monday-green text-white hover:bg-monday-green/90 shadow-monday-green/20 shadow-md font-medium',
  },
  negotiating: {
    color: 'border-monday-orange/40 bg-monday-orange text-white hover:bg-monday-orange/90 shadow-monday-orange/20 shadow-md font-medium',
  },
  prospect: {
    color: 'border-monday-blue/40 bg-monday-blue text-white hover:bg-monday-blue/90 shadow-monday-blue/20 shadow-md font-medium',
  },
  cold: {
    color: 'border-monday-gray-3/40 bg-monday-gray-3 text-white hover:bg-monday-gray-3/90 shadow-monday-gray-3/20 shadow-md',
  },
  // Customer Value Categories
  'high-value': {
    color: 'border-monday-purple/40 bg-monday-purple text-white hover:bg-monday-purple/90 shadow-monday-purple/20 shadow-md font-semibold',
  },
  'new-customer': {
    color: 'border-monday-green/30 bg-monday-green/15 text-monday-green hover:bg-monday-green/25 shadow-monday-green/10 shadow-sm font-medium',
  },
  potential: {
    color: 'border-monday-blue/30 bg-monday-blue/15 text-monday-blue hover:bg-monday-blue/25 shadow-monday-blue/10 shadow-sm',
  },
  lost: {
    color: 'border-red-400/40 bg-red-500 text-white hover:bg-red-500/90 shadow-red-500/20 shadow-md',
  },
  educated: {
    color: 'border-monday-purple/30 bg-monday-purple/15 text-monday-purple hover:bg-monday-purple/25 shadow-monday-purple/10 shadow-sm',
  },
  'major-client': {
    color: 'border-pink-400/40 bg-pink-500 text-white hover:bg-pink-500/90 shadow-pink-500/20 shadow-md font-semibold',
  },
  default: {
    color: 'border-monday-gray-2 bg-monday-gray-1 text-monday-gray-4 hover:bg-monday-gray-2',
  },
};

export const getTagStyle = (tagName: string) => {
  const category = tagCategories[tagName] || 'default';
  return categoryStyles[category as keyof typeof categoryStyles];
};
