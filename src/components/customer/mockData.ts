
import { Customer } from '@/types/customer';

export const mockCustomers: Customer[] = [
  // Individual customers (4 entries with different statuses)
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
    id: '5',
    name: '刘强',
    type: 'individual',
    tags: ['潜在客户', '高学历'],
    contactPerson: '刘强',
    contactMethod: 'liuqiang@email.com',
    dataSource: 'Google',
    customerScore: 72,
    updatedDate: '2024-01-12',
    email: 'liuqiang@email.com',
    phone: '+86 136 0000 9999',
    status: 'prospect',
    lastContact: '2024-01-11',
    conversationHistory: [
      {
        date: '2024-01-11',
        type: 'meeting',
        summary: '产品咨询会议，展现购买意向'
      }
    ]
  },
  {
    id: '6',
    name: '陈华',
    type: 'individual',
    tags: ['流失客户'],
    contactPerson: '陈华',
    contactMethod: 'chenhua@email.com',
    dataSource: 'Import',
    customerScore: 45,
    updatedDate: '2024-01-05',
    email: 'chenhua@email.com',
    phone: '+86 135 0000 1111',
    status: 'inactive',
    lastContact: '2023-12-20',
    conversationHistory: [
      {
        date: '2023-12-20',
        type: 'email',
        summary: '长期未响应邮件联系'
      }
    ]
  },
  // Company customers (4 entries with different statuses)
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
    status: 'client',
    lastContact: '2024-01-12',
    conversationHistory: [
      {
        date: '2024-01-12',
        type: 'meeting',
        summary: '签署正式合作协议'
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
        summary: '正在商谈合作细节'
      }
    ]
  },
  {
    id: '7',
    name: '智能科技股份',
    company: '智能科技股份',
    type: 'company',
    tags: ['AI', '新兴企业'],
    contactPerson: '张总',
    contactMethod: 'zhang@aitech.com',
    dataSource: 'LinkedIn',
    customerScore: 66,
    updatedDate: '2024-01-10',
    email: 'zhang@aitech.com',
    phone: '+86 010 8888 6666',
    status: 'active',
    lastContact: '2024-01-07',
    conversationHistory: [
      {
        date: '2024-01-07',
        type: 'call',
        summary: '了解AI解决方案需求'
      }
    ]
  },
  {
    id: '8',
    name: '传统贸易公司',
    company: '传统贸易公司',
    type: 'company',
    tags: ['传统行业', '小规模'],
    contactPerson: '王主管',
    contactMethod: 'wang@trade.com',
    dataSource: 'Import',
    customerScore: 38,
    updatedDate: '2024-01-03',
    email: 'wang@trade.com',
    phone: '+86 027 5555 3333',
    status: 'inactive',
    lastContact: '2023-11-15',
    conversationHistory: [
      {
        date: '2023-11-15',
        type: 'email',
        summary: '多次联系无回应，暂停跟进'
      }
    ]
  }
];
