
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
    color: 'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200',
  },
  technology: {
    color: 'border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-200',
  },
  feature: {
    color: 'border-green-200 bg-green-100 text-green-800 hover:bg-green-200',
  },
  corporate: {
    color: 'border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-200',
  },
  // Customer Status Categories
  client: {
    color: 'border-emerald-300 bg-emerald-200 text-emerald-900 hover:bg-emerald-300 shadow-emerald-100 shadow-sm',
  },
  negotiating: {
    color: 'border-amber-300 bg-amber-200 text-amber-900 hover:bg-amber-300 shadow-amber-100 shadow-sm',
  },
  prospect: {
    color: 'border-cyan-300 bg-cyan-200 text-cyan-900 hover:bg-cyan-300 shadow-cyan-100 shadow-sm',
  },
  cold: {
    color: 'border-slate-300 bg-slate-200 text-slate-700 hover:bg-slate-300 shadow-slate-100 shadow-sm',
  },
  // Customer Value Categories
  'high-value': {
    color: 'border-rose-300 bg-rose-200 text-rose-900 hover:bg-rose-300 shadow-rose-100 shadow-sm font-semibold',
  },
  'new-customer': {
    color: 'border-lime-300 bg-lime-200 text-lime-900 hover:bg-lime-300 shadow-lime-100 shadow-sm',
  },
  potential: {
    color: 'border-indigo-300 bg-indigo-200 text-indigo-900 hover:bg-indigo-300 shadow-indigo-100 shadow-sm',
  },
  lost: {
    color: 'border-red-300 bg-red-200 text-red-800 hover:bg-red-300 shadow-red-100 shadow-sm',
  },
  educated: {
    color: 'border-violet-300 bg-violet-200 text-violet-900 hover:bg-violet-300 shadow-violet-100 shadow-sm',
  },
  'major-client': {
    color: 'border-pink-300 bg-pink-200 text-pink-900 hover:bg-pink-300 shadow-pink-100 shadow-sm font-semibold',
  },
  default: {
    color: 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200',
  },
};

export const getTagStyle = (tagName: string) => {
  const category = tagCategories[tagName] || 'default';
  return categoryStyles[category as keyof typeof categoryStyles];
};
