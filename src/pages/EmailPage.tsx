
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle }  from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Search, 
  Filter,
  Inbox,
  Send,
  Bot
} from 'lucide-react';
import EmailList from '@/components/email/EmailList';
import EmailDetail from '@/components/email/EmailDetail';
import { Email, EmailFilter } from '@/types/email';

const EmailPage = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('manual');

  // 模拟邮件数据
  const mockEmails: Email[] = [
    {
      id: '1',
      from: 'john.smith@example.com',
      to: 'me@company.com',
      subject: '关于产品询价的问题',
      content: '您好，我对贵公司的产品很感兴趣，希望能获取详细的价格清单和技术规格。我们公司是一家大型制造企业，有长期合作的可能性。期待您的回复。',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      isAIGenerated: false,
      priority: 'high',
      category: 'inbox',
      attachments: ['产品规格.pdf']
    },
    {
      id: '2',
      from: 'ai-assistant@company.com',
      to: 'john.smith@example.com',
      subject: 'Re: 关于产品询价的问题',
      content: '尊敬的史密斯先生，\n\n感谢您对我们产品的关注。根据您的需求，我已为您准备了详细的产品价格清单和技术规格文档。\n\n我们的产品具有以下优势：\n1. 高品质材料制造\n2. 符合国际标准\n3. 优质的售后服务\n4. 具有竞争力的价格\n\n如需进一步讨论，请随时联系我们。\n\n此致敬礼，\nAI业务助手',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true,
      isAIGenerated: true,
      priority: 'medium',
      category: 'ai-sent'
    },
    {
      id: '3',
      from: 'sarah.wilson@partner.com',
      to: 'me@company.com',
      subject: '合作提案讨论',
      content: '希望与贵公司探讨潜在的合作机会。我们在相关领域有丰富经验，相信可以实现互利共赢。',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      isAIGenerated: false,
      priority: 'medium',
      category: 'inbox'
    },
    {
      id: '4',
      from: 'ai-assistant@company.com',
      to: 'potential.client@business.com',
      subject: '产品推广 - 限时优惠',
      content: '尊敬的客户，\n\n我们正在进行限时优惠活动，现在是了解我们产品的最佳时机。本次活动包括：\n\n• 首次订购享受20%折扣\n• 免费技术支持\n• 快速交付服务\n\n机会难得，欢迎垂询！',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      isAIGenerated: true,
      priority: 'low',
      category: 'ai-sent'
    }
  ];

  // 根据Tab筛选邮件
  const filteredEmails = useMemo(() => {
    let emails = mockEmails;
    
    // 根据Tab筛选
    if (activeTab === 'manual') {
      emails = emails.filter(email => !email.isAIGenerated);
    } else if (activeTab === 'ai') {
      emails = emails.filter(email => email.isAIGenerated);
    }
    
    // 根据搜索查询筛选
    if (searchQuery) {
      emails = emails.filter(email => 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return emails.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [activeTab, searchQuery]);

  // 获取未读邮件数量
  const getUnreadCount = (type: string) => {
    if (type === 'manual') return mockEmails.filter(e => !e.isRead && !e.isAIGenerated).length;
    if (type === 'ai') return mockEmails.filter(e => !e.isRead && e.isAIGenerated).length;
    return 0;
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    // 标记为已读的逻辑在这里实现
  };

  const handleReply = (email: Email) => {
    console.log('回复邮件:', email.id);
    // 实现回复逻辑
  };

  const handleForward = (email: Email) => {
    console.log('转发邮件:', email.id);
    // 实现转发逻辑
  };

  const handleDelete = (email: Email) => {
    console.log('删除邮件:', email.id);
    // 实现删除逻辑
  };

  const handleArchive = (email: Email) => {
    console.log('归档邮件:', email.id);
    // 实现归档逻辑
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-6 w-6" />
            <h1 className="text-2xl font-bold">电子邮件</h1>
          </div>
          
          {/* 搜索栏移到标题行 */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索邮件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* 左侧邮件列表 */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual" className="text-xs">
                    <Send className="mr-1 h-3 w-3" />
                    人工处理
                    {getUnreadCount('manual') > 0 && (
                      <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                        {getUnreadCount('manual')}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs">
                    <Bot className="mr-1 h-3 w-3" />
                    AI发送
                    {getUnreadCount('ai') > 0 && (
                      <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                        {getUnreadCount('ai')}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-auto p-4">
              <EmailList
                emails={filteredEmails}
                selectedEmailId={selectedEmail?.id || null}
                onEmailSelect={handleEmailSelect}
              />
            </CardContent>
          </Card>
        </div>

        {/* 右侧邮件详情 */}
        <div className="lg:col-span-2">
          <EmailDetail
            email={selectedEmail}
            onReply={handleReply}
            onForward={handleForward}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
