import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle }  from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Send,
  Bot,
  Inbox,
  Archive,
  Star,
  Settings
} from 'lucide-react';
import EmailStats from '@/components/email/EmailStats';
import EnhancedEmailList from '@/components/email/EnhancedEmailList';
import EmailDetail from '@/components/email/EmailDetail';
import EmailToolbar from '@/components/email/EmailToolbar';
import { Email, EmailFilter, EmailStats as EmailStatsType } from '@/types/email';

const EmailPage = () => {
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<EmailFilter>({
    category: 'all',
    priority: undefined,
    status: undefined,
    isRead: undefined
  });

  // 模拟增强的邮件数据
  const mockEmails: Email[] = [
    {
      id: '1',
      user_id: 1,
      brand_id: 1,
      customer_id: 1,
      from_email: 'john.smith@example.com',
      to_email: 'me@company.com',
      subject: '关于产品询价的详细问题 - 急需回复',
      content: '您好，我们是一家位于美国的大型制造企业，对贵公司的产品线非常感兴趣。我们希望能获取详细的价格清单、技术规格以及最小起订量信息。另外，我们也想了解贵公司的质量认证情况和交货周期。期待您的详细回复，这个项目对我们来说非常重要。',
      email_type: 'manual',
      priority: 'high',
      status: 'delivered',
      is_read: false,
      attachments: ['产品需求清单.pdf', '公司介绍.docx'],
      tracking_data: { opened_at: null, clicks: 0 },
      ai_insights: { sentiment: 'positive', urgency: 'high', intent: 'purchase' },
      tags: ['重要客户', '美国市场', '制造业'],
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      user_id: 1,
      brand_id: 1,
      customer_id: 1,
      from_email: 'ai-assistant@company.com',
      to_email: 'john.smith@example.com',
      subject: 'Re: 关于产品询价的详细问题 - 产品信息及报价',
      content: '尊敬的Smith先生，\n\n感谢您对我们产品的关注与信任。根据您的需求，我已为您准备了详细的产品信息包：\n\n🔹 产品价格清单（含批量优惠）\n🔹 完整技术规格文档\n🔹 质量认证证书（ISO9001, CE, RoHS）\n🔹 标准交货周期说明\n\n亮点优势：\n✅ 15年行业经验，品质保证\n✅ 灵活的MOQ政策，支持小批量试订\n✅ 30天质量保证期\n✅ 7x24小时技术支持\n\n我们相信这次合作将为双方带来互利共赢的结果。如需进一步讨论或安排视频会议，请随时联系我。\n\n期待您的回复！\n\n此致敬礼，\nAI业务助手 | 智能客服团队',
      email_type: 'ai_generated',
      priority: 'medium',
      status: 'sent',
      is_read: true,
      scheduled_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      sent_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      attachments: ['产品价格清单2024.pdf', '技术规格书.pdf', '质量认证.zip'],
      tracking_data: { opened_at: new Date(Date.now() - 30 * 60 * 1000), clicks: 2 },
      ai_insights: { 
        generated_by: 'gpt-4', 
        confidence: 0.95, 
        personalization_score: 0.88,
        template_used: 'inquiry_response_v2'
      },
      tags: ['AI发送', '产品询价', '自动回复'],
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '3',
      user_id: 1,
      brand_id: 1,
      customer_id: 2,
      from_email: 'sarah.wilson@partner.com',
      to_email: 'me@company.com',
      subject: '战略合作提案 - 共同开拓欧洲市场',
      content: '您好，我们是一家在欧洲市场深耕多年的贸易公司，专注于工业产品分销。我们了解到贵公司在产品质量和技术创新方面的卓越表现，希望能与您探讨在欧洲市场的战略合作机会。我们拥有完善的销售网络和本地化服务能力，相信可以实现真正的互利共赢。',
      email_type: 'manual',
      priority: 'medium',
      status: 'opened',
      is_read: true,
      opened_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      attachments: ['公司实力介绍.pdf'],
      tracking_data: { opened_at: new Date(Date.now() - 1 * 60 * 60 * 1000), clicks: 1 },
      ai_insights: { sentiment: 'positive', business_value: 'high', opportunity_type: 'partnership' },
      tags: ['合作伙伴', '欧洲市场', '战略合作'],
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: '4',
      user_id: 1,
      brand_id: 1,
      customer_id: 3,
      from_email: 'ai-assistant@company.com',
      to_email: 'potential.client@business.com',
      subject: '🔥 限时优惠活动 - 新品发布特惠价格',
      content: '尊敬的客户，\n\n🎉 好消息！我们正在进行年度最大规模的新品发布优惠活动：\n\n💰 特惠内容：\n• 新品首购享受20%特别折扣\n• 免费技术培训和安装指导\n• 1年延保服务，贴心售后保障\n• 快速交付，15天内发货\n\n⏰ 活动时间有限，仅限本月！\n\n我们的新品在性能和成本效益方面都有显著提升，已获得多家知名企业的好评。这是您体验我们产品质量和服务的绝佳机会。\n\n立即联系我们，获取专属报价方案！\n\n期待与您合作，\n智能营销团队',
      email_type: 'ai_generated',
      priority: 'low',
      status: 'bounced',
      is_read: true,
      sent_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
      attachments: ['新品介绍册.pdf', '优惠政策详情.docx'],
      tracking_data: { bounce_reason: 'invalid_email', attempts: 1 },
      ai_insights: { 
        campaign_type: 'promotional', 
        target_segment: 'potential_customers',
        template_used: 'promotion_v3',
        personalization_score: 0.72
      },
      tags: ['营销推广', '新品发布', '限时优惠'],
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '5',
      user_id: 1,
      brand_id: 1,
      customer_id: 4,
      from_email: 'follow-up@company.com',
      to_email: 'david.brown@enterprise.com',
      subject: '跟进：上周会议讨论要点及后续安排',
      content: 'David先生，您好！\n\n感谢您上周抽出宝贵时间与我们进行深入交流。会议中您提到的几个关键点我们已经认真整理：\n\n📋 会议要点回顾：\n1. 产品定制需求确认\n2. 交货时间协调方案\n3. 质量标准对接流程\n4. 长期合作框架探讨\n\n📅 后续安排：\n• 本周内提供定制方案初稿\n• 安排技术团队对接会议\n• 准备样品寄送清单\n\n我们非常重视这次合作机会，会确保每个细节都得到妥善处理。如有任何疑问或需要澄清的地方，请随时联系我。\n\n期待进一步合作！',
      email_type: 'manual',
      priority: 'medium',
      status: 'replied',
      is_read: true,
      sent_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
      opened_at: new Date(Date.now() - 7 * 60 * 60 * 1000),
      replied_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
      attachments: ['会议纪要.docx'],
      tracking_data: { 
        opened_at: new Date(Date.now() - 7 * 60 * 60 * 1000), 
        clicks: 3,
        reply_time_minutes: 180
      },
      ai_insights: { 
        engagement_level: 'high', 
        next_action: 'prepare_proposal',
        deal_probability: 0.75
      },
      tags: ['跟进邮件', '企业客户', '商务会议'],
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000)
    }
  ];

  // 计算邮件统计数据
  const emailStats: EmailStatsType = useMemo(() => {
    const stats = {
      total: mockEmails.length,
      sent: mockEmails.filter(e => ['sent', 'delivered', 'opened', 'replied'].includes(e.status)).length,
      delivered: mockEmails.filter(e => ['delivered', 'opened', 'replied'].includes(e.status)).length,
      opened: mockEmails.filter(e => ['opened', 'replied'].includes(e.status)).length,
      replied: mockEmails.filter(e => e.status === 'replied').length,
      bounced: mockEmails.filter(e => e.status === 'bounced').length,
      pending: mockEmails.filter(e => e.status === 'draft').length
    };
    return stats;
  }, [mockEmails]);

  // 根据筛选条件过滤邮件
  const filteredEmails = useMemo(() => {
    let emails = mockEmails;
    
    // 根据Tab筛选
    if (activeTab === 'sent') {
      emails = emails.filter(email => ['sent', 'delivered', 'opened', 'replied'].includes(email.status));
    } else if (activeTab === 'ai') {
      emails = emails.filter(email => email.email_type === 'ai_generated');
    } else if (activeTab === 'drafts') {
      emails = emails.filter(email => email.status === 'draft');
    } else if (activeTab === 'starred') {
      emails = emails.filter(email => email.tags?.includes('starred'));
    }
    
    // 根据分类筛选
    if (filters.category !== 'all') {
      if (filters.category === 'manual') {
        emails = emails.filter(email => email.email_type === 'manual');
      } else if (filters.category === 'ai') {
        emails = emails.filter(email => email.email_type === 'ai_generated');
      } else if (filters.category === 'template') {
        emails = emails.filter(email => email.email_type === 'template');
      }
    }
    
    // 其他筛选条件
    if (filters.priority) {
      emails = emails.filter(email => email.priority === filters.priority);
    }
    
    if (filters.status) {
      emails = emails.filter(email => email.status === filters.status);
    }
    
    if (filters.isRead !== undefined) {
      emails = emails.filter(email => email.is_read === filters.isRead);
    }
    
    // 根据搜索查询筛选
    if (searchQuery) {
      emails = emails.filter(email => 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return emails.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
  }, [activeTab, filters, searchQuery]);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    // 标记为已读的逻辑
  };

  const handleEmailAction = (action: string, email: Email) => {
    console.log(`执行操作: ${action}`, email.id);
    
    switch (action) {
      case 'reply':
        navigate('/marketing/email/compose', { state: { email } });
        break;
      case 'forward':
        navigate('/marketing/email/compose', { state: { email, forward: true } });
        break;
      case 'archive':
        toast({
          title: "邮件已归档",
          description: `邮件 "${email.subject}" 已成功归档`,
        });
        break;
      case 'delete':
        toast({
          title: "邮件已删除",
          description: `邮件 "${email.subject}" 已移入垃圾箱`,
        });
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`批量操作: ${action}`, selectedEmails);
    toast({
      title: "批量操作完成",
      description: `已对 ${selectedEmails.length} 封邮件执行${action}操作`,
    });
    setSelectedEmails([]);
  };

  const handleRefresh = () => {
    toast({
      title: "刷新完成",
      description: "邮件列表已更新",
    });
  };

  const handleCompose = () => {
    navigate('/marketing/email/compose');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">智能邮件营销</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => navigate('/marketing/email/templates')}>
              <Settings className="h-4 w-4 mr-2" />
              模板管理
            </Button>
            <Button onClick={handleCompose} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              写邮件
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-6">
          <EmailStats stats={emailStats} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <TabsList className="grid w-full grid-rows-5 h-auto bg-gray-50">
                <TabsTrigger value="inbox" className="justify-start data-[state=active]:bg-white">
                  <Inbox className="h-4 w-4 mr-2" />
                  收件箱
                </TabsTrigger>
                <TabsTrigger value="sent" className="justify-start data-[state=active]:bg-white">
                  <Send className="h-4 w-4 mr-2" />
                  已发送
                </TabsTrigger>
                <TabsTrigger value="ai" className="justify-start data-[state=active]:bg-white">
                  <Bot className="h-4 w-4 mr-2" />
                  AI发送
                </TabsTrigger>
                <TabsTrigger value="drafts" className="justify-start data-[state=active]:bg-white">
                  <Mail className="h-4 w-4 mr-2" />
                  草稿
                </TabsTrigger>
                <TabsTrigger value="starred" className="justify-start data-[state=active]:bg-white">
                  <Star className="h-4 w-4 mr-2" />
                  已标星
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Middle - Email List */}
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
          <EmailToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            selectedCount={selectedEmails.length}
            onBulkAction={handleBulkAction}
            onRefresh={handleRefresh}
            onCompose={handleCompose}
          />
          
          <div className="flex-1 overflow-auto p-4">
            <EnhancedEmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmail?.id || null}
              onEmailSelect={handleEmailSelect}
              onEmailAction={handleEmailAction}
            />
          </div>
        </div>

        {/* Right - Email Detail */}
        <div className="w-1/2 bg-white">
          <EmailDetail
            email={selectedEmail}
            onReply={(email) => handleEmailAction('reply', email)}
            onForward={(email) => handleEmailAction('forward', email)}
            onDelete={(email) => handleEmailAction('delete', email)}
            onArchive={(email) => handleEmailAction('archive', email)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
