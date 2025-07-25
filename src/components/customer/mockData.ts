
import { Customer } from '@/types/customer';

export const mockCustomers: Customer[] = [
  // Individual customers (4 entries with different statuses)
  {
    id: '1',
    name: '张明',
    type: 'individual',
    tags: ['高价值', 'VIP', '已签约客户'],
    contactPerson: '张明',
    contactMethod: 'zhangming@email.com',
    dataSource: 'LinkedIn',
    customerScore: 85,
    updatedDate: '2024-01-15',
    email: 'zhangming@email.com',
    phone: '+86 138 0000 1234',
    status: 'client',
    isActive: true,
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
    tags: ['新客户', '意向客户'],
    contactPerson: '王丽',
    contactMethod: 'wangli@email.com',
    dataSource: 'Meta',
    customerScore: 68,
    updatedDate: '2024-01-13',
    email: 'wangli@email.com',
    phone: '+86 139 0000 5678',
    status: 'active',
    isActive: true,
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
    tags: ['潜在客户', '高学历', '谈判中客户'],
    contactPerson: '刘强',
    contactMethod: 'liuqiang@email.com',
    dataSource: 'Google',
    customerScore: 72,
    updatedDate: '2024-01-12',
    email: 'liuqiang@email.com',
    phone: '+86 136 0000 9999',
    status: 'prospect',
    isActive: true,
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
    tags: ['流失客户', '冷客户'],
    contactPerson: '陈华',
    contactMethod: 'chenhua@email.com',
    dataSource: 'Import',
    customerScore: 45,
    updatedDate: '2024-01-05',
    email: 'chenhua@email.com',
    phone: '+86 135 0000 1111',
    status: 'inactive',
    isActive: false,
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
    tags: ['科技', '大客户', '已签约客户'],
    contactPerson: '李经理',
    contactMethod: 'lijingli@tech.com',
    dataSource: 'Google',
    customerScore: 92,
    updatedDate: '2024-01-14',
    email: 'lijingli@tech.com',
    phone: '+86 400 888 9999',
    status: 'client',
    isActive: true,
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
    tags: ['制造业', '潜在客户', '谈判中客户'],
    contactPerson: '陈总监',
    contactMethod: 'chen@innovation.com',
    dataSource: 'Manual',
    customerScore: 78,
    updatedDate: '2024-01-11',
    email: 'chen@innovation.com',
    phone: '+86 021 6666 8888',
    status: 'prospect',
    isActive: true,
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
    tags: ['AI', '新兴企业', '意向客户'],
    contactPerson: '张总',
    contactMethod: 'zhang@aitech.com',
    dataSource: 'LinkedIn',
    customerScore: 66,
    updatedDate: '2024-01-10',
    email: 'zhang@aitech.com',
    phone: '+86 010 8888 6666',
    status: 'active',
    isActive: true,
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
    tags: ['传统行业', '小规模', '冷客户'],
    contactPerson: '王主管',
    contactMethod: 'wang@trade.com',
    dataSource: 'Import',
    customerScore: 38,
    updatedDate: '2024-01-03',
    email: 'wang@trade.com',
    phone: '+86 027 5555 3333',
    status: 'inactive',
    isActive: false,
    lastContact: '2023-11-15',
    conversationHistory: [
      {
        date: '2023-11-15',
        type: 'email',
        summary: '多次联系无回应，暂停跟进'
      }
    ]
  },
  // Additional individual customers
  {
    id: '9',
    name: '赵敏',
    type: 'individual',
    tags: ['高净值', 'VIP', '忠诚客户'],
    contactPerson: '赵敏',
    contactMethod: 'zhaomin@email.com',
    dataSource: 'LinkedIn',
    customerScore: 88,
    updatedDate: '2024-01-16',
    email: 'zhaomin@email.com',
    phone: '+86 137 0000 2222',
    status: 'client',
    isActive: true,
    lastContact: '2024-01-14',
    conversationHistory: [
      {
        date: '2024-01-14',
        type: 'meeting',
        summary: '年度续约会议，讨论服务升级'
      }
    ]
  },
  {
    id: '10',
    name: '孙琳',
    type: 'individual',
    tags: ['年轻客户', '科技爱好者'],
    contactPerson: '孙琳',
    contactMethod: 'sunlin@email.com',
    dataSource: 'Meta',
    customerScore: 71,
    updatedDate: '2024-01-15',
    email: 'sunlin@email.com',
    phone: '+86 134 0000 3333',
    status: 'active',
    isActive: true,
    lastContact: '2024-01-13',
    conversationHistory: [
      {
        date: '2024-01-13',
        type: 'email',
        summary: '咨询最新产品功能'
      }
    ]
  },
  {
    id: '11',
    name: '周杰',
    type: 'individual',
    tags: ['投资者', '高频交易'],
    contactPerson: '周杰',
    contactMethod: 'zhoujie@email.com',
    dataSource: 'Google',
    customerScore: 79,
    updatedDate: '2024-01-14',
    email: 'zhoujie@email.com',
    phone: '+86 133 0000 4444',
    status: 'prospect',
    isActive: true,
    lastContact: '2024-01-12',
    conversationHistory: [
      {
        date: '2024-01-12',
        type: 'call',
        summary: '投资方案咨询'
      }
    ]
  },
  {
    id: '12',
    name: '吴燕',
    type: 'individual',
    tags: ['教育行业', '决策者'],
    contactPerson: '吴燕',
    contactMethod: 'wuyan@email.com',
    dataSource: 'Manual',
    customerScore: 74,
    updatedDate: '2024-01-13',
    email: 'wuyan@email.com',
    phone: '+86 132 0000 5555',
    status: 'active',
    isActive: true,
    lastContact: '2024-01-11',
    conversationHistory: [
      {
        date: '2024-01-11',
        type: 'meeting',
        summary: '教育解决方案需求分析'
      }
    ]
  },
  {
    id: '13',
    name: '郑凯',
    type: 'individual',
    tags: ['创业者', '初次接触'],
    contactPerson: '郑凯',
    contactMethod: 'zhengkai@email.com',
    dataSource: 'Import',
    customerScore: 56,
    updatedDate: '2024-01-10',
    email: 'zhengkai@email.com',
    phone: '+86 131 0000 6666',
    status: 'prospect',
    isActive: true,
    lastContact: '2024-01-09',
    conversationHistory: [
      {
        date: '2024-01-09',
        type: 'email',
        summary: '创业项目合作探讨'
      }
    ]
  },
  // Additional company customers
  {
    id: '14',
    name: '新能源科技公司',
    company: '新能源科技公司',
    type: 'company',
    tags: ['新能源', '环保', '政府背景'],
    contactPerson: '林总',
    contactMethod: 'lin@newenergy.com',
    dataSource: 'LinkedIn',
    customerScore: 89,
    updatedDate: '2024-01-16',
    email: 'lin@newenergy.com',
    phone: '+86 025 7777 8888',
    status: 'client',
    isActive: true,
    lastContact: '2024-01-15',
    conversationHistory: [
      {
        date: '2024-01-15',
        type: 'meeting',
        summary: '新能源项目合作洽谈'
      }
    ]
  },
  {
    id: '15',
    name: '金融投资集团',
    company: '金融投资集团',
    type: 'company',
    tags: ['金融', '投资', '大型企业'],
    contactPerson: '王副总',
    contactMethod: 'wang@finance.com',
    dataSource: 'Google',
    customerScore: 94,
    updatedDate: '2024-01-17',
    email: 'wang@finance.com',
    phone: '+86 010 9999 0000',
    status: 'client',
    isActive: true,
    lastContact: '2024-01-16',
    conversationHistory: [
      {
        date: '2024-01-16',
        type: 'meeting',
        summary: '年度合作计划制定'
      }
    ]
  },
  {
    id: '16',
    name: '医疗器械有限公司',
    company: '医疗器械有限公司',
    type: 'company',
    tags: ['医疗', '器械', '合规要求'],
    contactPerson: '刘主任',
    contactMethod: 'liu@medical.com',
    dataSource: 'Meta',
    customerScore: 76,
    updatedDate: '2024-01-12',
    email: 'liu@medical.com',
    phone: '+86 028 3333 4444',
    status: 'prospect',
    isActive: true,
    lastContact: '2024-01-10',
    conversationHistory: [
      {
        date: '2024-01-10',
        type: 'call',
        summary: '医疗设备采购需求沟通'
      }
    ]
  },
  {
    id: '17',
    name: '电商平台运营公司',
    company: '电商平台运营公司',
    type: 'company',
    tags: ['电商', '互联网', '快速增长'],
    contactPerson: '张运营总监',
    contactMethod: 'zhang@ecommerce.com',
    dataSource: 'Manual',
    customerScore: 82,
    updatedDate: '2024-01-14',
    email: 'zhang@ecommerce.com',
    phone: '+86 0571 5555 6666',
    status: 'active',
    isActive: true,
    lastContact: '2024-01-13',
    conversationHistory: [
      {
        date: '2024-01-13',
        type: 'email',
        summary: '电商平台技术支持方案讨论'
      }
    ]
  },
  {
    id: '18',
    name: '房地产开发集团',
    company: '房地产开发集团',
    type: 'company',
    tags: ['房地产', '建筑', '传统行业'],
    contactPerson: '李项目经理',
    contactMethod: 'li@realestate.com',
    dataSource: 'Import',
    customerScore: 69,
    updatedDate: '2024-01-11',
    email: 'li@realestate.com',
    phone: '+86 020 7777 8888',
    status: 'prospect',
    isActive: true,
    lastContact: '2024-01-08',
    conversationHistory: [
      {
        date: '2024-01-08',
        type: 'meeting',
        summary: '智能楼宇解决方案介绍'
      }
    ]
  },
  {
    id: '19',
    name: '教育培训机构',
    company: '教育培训机构',
    type: 'company',
    tags: ['教育', '培训', '在线教育'],
    contactPerson: '马校长',
    contactMethod: 'ma@education.com',
    dataSource: 'LinkedIn',
    customerScore: 73,
    updatedDate: '2024-01-13',
    email: 'ma@education.com',
    phone: '+86 0755 2222 3333',
    status: 'active',
    isActive: true,
    lastContact: '2024-01-12',
    conversationHistory: [
      {
        date: '2024-01-12',
        type: 'call',
        summary: '在线教育平台技术需求沟通'
      }
    ]
  },
  {
    id: '20',
    name: '物流快递公司',
    company: '物流快递公司',
    type: 'company',
    tags: ['物流', '快递', '供应链'],
    contactPerson: '周运营经理',
    contactMethod: 'zhou@logistics.com',
    dataSource: 'Google',
    customerScore: 64,
    updatedDate: '2024-01-09',
    email: 'zhou@logistics.com',
    phone: '+86 0532 4444 5555',
    status: 'inactive',
    isActive: false,
    lastContact: '2023-12-15',
    conversationHistory: [
      {
        date: '2023-12-15',
        type: 'email',
        summary: '物流管理系统升级暂缓'
      }
    ]
  }
];
