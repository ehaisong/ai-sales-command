
import { Customer } from '@/types/customer';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '张明',
    type: 'individual',
    tags: ['高价值', 'VIP'],
    contactPerson: '张明',
    contactMethod: 'zhangming@email.com',
    dataSource: 'LinkedIn',
    customerScore: 85,
    updatedDate: '2024-01-15',
    email: 'zhangming@email.com',
    phone: '+86 138 0000 1234',
    status: 'client',
    lastContact: '2024-01-10',
    conversationHistory: [
      {
        date: '2024-01-10',
        type: 'email',
        summary: '讨论了新产品的价格方案'
      }
    ]
  },
  {
    id: '2',
    name: '科技有限公司',
    company: '科技有限公司',
    type: 'company',
    tags: ['科技', '大客户'],
    contactPerson: '李经理',
    contactMethod: 'lijingli@tech.com',
    dataSource: 'Google',
    customerScore: 92,
    updatedDate: '2024-01-14',
    email: 'lijingli@tech.com',
    phone: '+86 400 888 9999',
    status: 'prospect',
    lastContact: '2024-01-12',
    conversationHistory: [
      {
        date: '2024-01-12',
        type: 'meeting',
        summary: '产品演示会议，客户表现出浓厚兴趣'
      }
    ]
  },
  {
    id: '3',
    name: '王丽',
    type: 'individual',
    tags: ['新客户'],
    contactPerson: '王丽',
    contactMethod: 'wangli@email.com',
    dataSource: 'Meta',
    customerScore: 68,
    updatedDate: '2024-01-13',
    email: 'wangli@email.com',
    phone: '+86 139 0000 5678',
    status: 'active',
    lastContact: '2024-01-08',
    conversationHistory: [
      {
        date: '2024-01-08',
        type: 'call',
        summary: '初次联系，了解需求'
      }
    ]
  },
  {
    id: '4',
    name: '创新企业集团',
    company: '创新企业集团',
    type: 'company',
    tags: ['制造业', '潜在大客户'],
    contactPerson: '陈总监',
    contactMethod: 'chen@innovation.com',
    dataSource: 'Manual',
    customerScore: 78,
    updatedDate: '2024-01-11',
    email: 'chen@innovation.com',
    phone: '+86 021 6666 8888',
    status: 'prospect',
    lastContact: '2024-01-09',
    conversationHistory: [
      {
        date: '2024-01-09',
        type: 'email',
        summary: '发送了产品介绍资料'
      }
    ]
  }
];
