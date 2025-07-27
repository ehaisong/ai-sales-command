
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Users,
  Bot,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import CustomerConversationsList from '@/components/conversation/CustomerConversationsList';
import ChatArea from '@/components/conversation/ChatArea';
import AISettingsPanel from '@/components/conversation/AISettingsPanel';
import CustomerInfoPanel from '@/components/conversation/CustomerInfoPanel';
import ManualTakeoverDialog from '@/components/customer/ManualTakeoverDialog';
import { UnifiedConversation, CustomerConversationSummary, ConversationFilter } from '@/types/conversation';

const UnifiedConversationPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerConversationSummary | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<UnifiedConversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ConversationFilter>({
    channel: 'all',
    status: 'all',
    priority: 'all',
    aiManaged: 'all'
  });
  const [takeoverDialog, setTakeoverDialog] = useState<{
    open: boolean;
    customer: CustomerConversationSummary | null;
  }>({ open: false, customer: null });
  const [activeTab, setActiveTab] = useState<'info' | 'ai'>('ai');
  
  const { toast } = useToast();

  // Mock customer conversation data
  const mockCustomers: CustomerConversationSummary[] = [
    {
      id: '1',
      name: 'John Smith',
      company: 'ABC Manufacturing',
      email: 'john.smith@abcmfg.com',
      phone: '+1-555-0123',
      avatar: undefined,
      lastContactDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 3,
      totalConversations: 12,
      isAIManaged: true,
      priority: 'high',
      tags: ['VIP客户', '制造业', '长期合作'],
      channels: ['email', 'whatsapp'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      company: 'Tech Solutions Inc',
      email: 'sarah.wilson@techsol.com',
      phone: '+1-555-0456',
      avatar: undefined,
      lastContactDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
      unreadCount: 0,
      totalConversations: 25,
      isAIManaged: false,
      priority: 'medium',
      tags: ['技术合作', '系统集成'],
      channels: ['email'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: '陈氏贸易公司',
      email: 'mike@chentrading.com',
      phone: '+86-138-0000-1234',
      avatar: undefined,
      lastContactDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
      unreadCount: 1,
      totalConversations: 8,
      isAIManaged: true,
      priority: 'medium',
      tags: ['新客户', '批发商'],
      channels: ['whatsapp'],
      status: 'active'
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      company: 'Global Imports Ltd',
      email: 'emma@globalimports.com',
      phone: '+44-20-7946-0958',
      avatar: undefined,
      lastContactDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      unreadCount: 2,
      totalConversations: 15,
      isAIManaged: true,
      priority: 'high',
      tags: ['国际贸易', '重要客户'],
      channels: ['email', 'whatsapp'],
      status: 'active'
    }
  ];

  // Generate mock conversation for selected customer
  const mockConversation: UnifiedConversation | null = selectedCustomer ? {
    id: `conv-${selectedCustomer.id}`,
    customerId: selectedCustomer.id,
    customerName: selectedCustomer.name,
    customerEmail: selectedCustomer.email,
    customerPhone: selectedCustomer.phone,
    customerAvatar: selectedCustomer.avatar,
    lastMessage: {
      id: 'msg-last',
      conversationId: `conv-${selectedCustomer.id}`,
      type: 'email',
      direction: 'inbound',
      content: '您好，我对贵公司的最新产品很感兴趣，希望能了解详细的技术规格和价格信息。我们公司正在寻找长期合作伙伴。',
      subject: '产品咨询 - 技术规格和报价需求',
      timestamp: selectedCustomer.lastContactDate,
      isRead: selectedCustomer.unreadCount === 0,
      isAIGenerated: false,
      sender: {
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone
      },
      recipient: {
        name: 'AI Assistant',
        email: 'ai@company.com'
      },
      status: 'delivered'
    },
    unreadCount: selectedCustomer.unreadCount,
    totalMessages: selectedCustomer.totalConversations * 4,
    channels: selectedCustomer.channels,
    tags: selectedCustomer.tags,
    priority: selectedCustomer.priority,
    status: selectedCustomer.status === 'active' ? 'active' : 'closed',
    isAIManaged: selectedCustomer.isAIManaged,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: selectedCustomer.lastContactDate
  } : null;

  // Filter customers based on search and filters
  const filteredCustomers = useMemo(() => {
    let customers = mockCustomers;
    
    if (searchQuery) {
      customers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filter.aiManaged && filter.aiManaged !== 'all') {
      customers = customers.filter(customer => 
        filter.aiManaged === 'ai' ? customer.isAIManaged : !customer.isAIManaged
      );
    }
    
    if (filter.priority && filter.priority !== 'all') {
      customers = customers.filter(customer => customer.priority === filter.priority);
    }
    
    return customers.sort((a, b) => b.lastContactDate.getTime() - a.lastContactDate.getTime());
  }, [searchQuery, filter]);

  const handleCustomerSelect = (customer: CustomerConversationSummary) => {
    setSelectedCustomer(customer);
    setSelectedConversation(mockConversation);
  };

  const handleManualTakeover = (customer: CustomerConversationSummary) => {
    setTakeoverDialog({ open: true, customer });
  };

  const handleTakeoverConfirm = () => {
    if (takeoverDialog.customer) {
      // Update customer AI status
      const updatedCustomer = { ...takeoverDialog.customer, isAIManaged: false };
      setSelectedCustomer(updatedCustomer);
      
      toast({
        title: "手动接管成功",
        description: `已成功接管客户 ${takeoverDialog.customer.name} 的对话管理`,
      });
    }
    setTakeoverDialog({ open: false, customer: null });
  };

  const handleSendMessage = (content: string, type: 'email' | 'whatsapp') => {
    console.log('发送消息:', { content, type, customerId: selectedCustomer?.id });
    toast({
      title: "消息已发送",
      description: `${type === 'email' ? '邮件' : 'WhatsApp消息'}已成功发送给 ${selectedCustomer?.name}`,
    });
  };

  const handleStartAIChat = () => {
    toast({
      title: "AI助手已启动",
      description: "正在为您分析客户信息并生成建议...",
    });
  };

  const handleRestoreAIManagement = () => {
    if (selectedCustomer) {
      const updatedCustomer = { ...selectedCustomer, isAIManaged: true };
      setSelectedCustomer(updatedCustomer);
      toast({
        title: "AI管理已恢复",
        description: `客户 ${selectedCustomer.name} 已重新启用AI自动管理`,
      });
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="page-title">营销对话中心</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索客户、公司或邮箱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-card border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <Button variant="outline" size="sm" className="monday-button border-border hover:border-primary">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid-stats">
          <Card className="monday-card-small card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="card-subtitle">活跃对话</p>
                  <p className="text-2xl font-bold text-foreground">{filteredCustomers.length}</p>
                  <p className="text-xs text-success mt-1">↗ +12% 本周</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="monday-card-small card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="card-subtitle">AI自动管理</p>
                  <p className="text-2xl font-bold text-success">
                    {filteredCustomers.filter(c => c.isAIManaged).length}
                  </p>
                  <p className="text-xs text-success mt-1">效率提升 85%</p>
                </div>
                <Bot className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="monday-card-small card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="card-subtitle">待处理消息</p>
                  <p className="text-2xl font-bold text-warning">
                    {filteredCustomers.reduce((sum, c) => sum + c.unreadCount, 0)}
                  </p>
                  <p className="text-xs text-warning mt-1">需要关注</p>
                </div>
                <MessageSquare className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="monday-card-small card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="card-subtitle">高优先级</p>
                  <p className="text-2xl font-bold text-error">
                    {filteredCustomers.filter(c => c.priority === 'high').length}
                  </p>
                  <p className="text-xs text-error mt-1">重点跟进</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-error" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
        {/* Left Sidebar - Customer List */}
        <div className="col-span-3">
          <CustomerConversationsList
            customers={filteredCustomers}
            selectedCustomerId={selectedCustomer?.id || null}
            onCustomerSelect={handleCustomerSelect}
            onManualTakeover={handleManualTakeover}
          />
        </div>

        {/* Center - Chat Area */}
        <div className="col-span-6">
          <ChatArea
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Sidebar - AI Settings & Customer Info */}
        <div className="col-span-3 space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'ai'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bot className="inline h-4 w-4 mr-1" />
              AI助手
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'info'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="inline h-4 w-4 mr-1" />
              客户信息
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'ai' ? (
            <AISettingsPanel
              selectedCustomer={selectedCustomer}
              onStartAIChat={handleStartAIChat}
              onManualTakeover={() => selectedCustomer && handleManualTakeover(selectedCustomer)}
            />
          ) : (
            <CustomerInfoPanel
              conversation={selectedConversation}
            />
          )}
        </div>
      </div>

      {/* Manual Takeover Dialog */}
      {takeoverDialog.customer && (
        <ManualTakeoverDialog
          open={takeoverDialog.open}
          onOpenChange={(open) => setTakeoverDialog({ open, customer: takeoverDialog.customer })}
          customer={takeoverDialog.customer}
          onConfirm={handleTakeoverConfirm}
        />
      )}
    </div>
  );
};

export default UnifiedConversationPage;
