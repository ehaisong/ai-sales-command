
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
    color: 'border-monday-blue/30 bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20 shadow-sm',
  },
  technology: {
    color: 'border-monday-purple/30 bg-monday-purple/10 text-monday-purple-dark hover:bg-monday-purple/20 shadow-sm',
  },
  feature: {
    color: 'border-emerald-300/50 bg-emerald-100/70 text-emerald-700 hover:bg-emerald-200/70 shadow-sm',
  },
  corporate: {
    color: 'border-monday-blue-dark/30 bg-monday-blue-dark/10 text-monday-blue-dark hover:bg-monday-blue-dark/20 shadow-sm',
  },
  // Customer Status Categories - Blue-purple style
  client: {
    color: 'border-emerald-400/40 bg-emerald-200/60 text-emerald-800 hover:bg-emerald-300/60 shadow-emerald-100/50 shadow-md font-medium',
  },
  negotiating: {
    color: 'border-monday-purple/40 bg-monday-purple/20 text-monday-purple-dark hover:bg-monday-purple/30 shadow-monday/30 shadow-md font-medium',
  },
  prospect: {
    color: 'border-monday-blue/40 bg-monday-blue/20 text-monday-blue-dark hover:bg-monday-blue/30 shadow-blue-100/50 shadow-md font-medium',
  },
  cold: {
    color: 'border-monday-gray-300/60 bg-monday-gray-100/80 text-monday-gray-700 hover:bg-monday-gray-200/80 shadow-monday-gray-100/50 shadow-md',
  },
  // Customer Value Categories - Blue-purple style
  'high-value': {
    color: 'border-rose-400/50 bg-rose-200/70 text-rose-800 hover:bg-rose-300/70 shadow-rose-100/60 shadow-md font-semibold',
  },
  'new-customer': {
    color: 'border-lime-400/50 bg-lime-200/70 text-lime-800 hover:bg-lime-300/70 shadow-lime-100/60 shadow-md font-medium',
  },
  potential: {
    color: 'border-monday-blue-light/50 bg-monday-blue-light/20 text-monday-blue-dark hover:bg-monday-blue-light/30 shadow-blue-100/60 shadow-md font-medium',
  },
  lost: {
    color: 'border-red-400/50 bg-red-200/70 text-red-800 hover:bg-red-300/70 shadow-red-100/60 shadow-md',
  },
  educated: {
    color: 'border-monday-purple-light/50 bg-monday-purple-light/20 text-monday-purple-dark hover:bg-monday-purple-light/30 shadow-violet-100/60 shadow-md font-medium',
  },
  'major-client': {
    color: 'border-pink-400/50 bg-pink-200/70 text-pink-800 hover:bg-pink-300/70 shadow-pink-100/60 shadow-md font-semibold',
  },
  default: {
    color: 'border-monday-gray-300/50 bg-monday-gray-100/70 text-monday-gray-700 hover:bg-monday-gray-200/70 shadow-sm',
  },
};

export const getTagStyle = (tagName: string) => {
  const category = tagCategories[tagName] || 'default';
  return categoryStyles[category as keyof typeof categoryStyles];
};
