
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Plus,
  Users,
  Bot
} from 'lucide-react';
import CustomerConversationsList from '@/components/conversation/CustomerConversationsList';
import ChatArea from '@/components/conversation/ChatArea';
import AISettingsPanel from '@/components/conversation/AISettingsPanel';
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
  
  const { toast } = useToast();

  // Mock customer conversation data
  const mockCustomers: CustomerConversationSummary[] = [
    {
      id: '1',
      name: 'John Smith',
      company: 'ABC Manufacturing',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      lastContactDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 2,
      totalConversations: 5,
      isAIManaged: true,
      priority: 'high',
      tags: ['重要客户', '产品询价'],
      channels: ['email', 'whatsapp'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      company: 'Tech Solutions Inc',
      email: 'sarah.wilson@techsol.com',
      phone: '+1-555-0456',
      lastContactDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
      unreadCount: 0,
      totalConversations: 8,
      isAIManaged: false,
      priority: 'medium',
      tags: ['合作伙伴', 'VIP客户'],
      channels: ['email'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: '陈氏贸易公司',
      email: 'mike@chentrading.com',
      phone: '+86-138-0000-1234',
      lastContactDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
      unreadCount: 1,
      totalConversations: 3,
      isAIManaged: true,
      priority: 'medium',
      tags: ['新客户', '批发商'],
      channels: ['whatsapp'],
      status: 'active'
    }
  ];

  // Mock conversation for selected customer
  const mockConversation: UnifiedConversation = selectedCustomer ? {
    id: `conv-${selectedCustomer.id}`,
    customerId: selectedCustomer.id,
    customerName: selectedCustomer.name,
    customerEmail: selectedCustomer.email,
    customerPhone: selectedCustomer.phone,
    lastMessage: {
      id: 'msg-last',
      conversationId: `conv-${selectedCustomer.id}`,
      type: 'email',
      direction: 'inbound',
      content: '您好，我对贵公司的产品很感兴趣，希望能获取详细的价格清单。',
      subject: '产品询价',
      timestamp: selectedCustomer.lastContactDate,
      isRead: false,
      isAIGenerated: false,
      sender: {
        name: selectedCustomer.name,
        email: selectedCustomer.email
      },
      recipient: {
        name: 'AI Assistant',
        email: 'ai@company.com'
      },
      status: 'delivered'
    },
    unreadCount: selectedCustomer.unreadCount,
    totalMessages: selectedCustomer.totalConversations * 3,
    channels: selectedCustomer.channels,
    tags: selectedCustomer.tags,
    priority: selectedCustomer.priority,
    status: selectedCustomer.status === 'active' ? 'active' : 'closed',
    isAIManaged: selectedCustomer.isAIManaged,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
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
      description: `${type === 'email' ? '邮件' : 'WhatsApp消息'}已成功发送`,
    });
  };

  const handleStartAIChat = () => {
    toast({
      title: "AI助手",
      description: "AI对话助手功能开发中...",
    });
  };

  return (
    <div className="p-6 h-full bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">营销对话中心</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索客户..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-white border-gray-200"
              />
            </div>
            <Button variant="outline" size="sm" className="border-gray-200">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">活跃对话</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredCustomers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI管理</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredCustomers.filter(c => c.isAIManaged).length}
                  </p>
                </div>
                <Bot className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">待回复</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {filteredCustomers.reduce((sum, c) => sum + c.unreadCount, 0)}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">高优先级</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredCustomers.filter(c => c.priority === 'high').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                </div>
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

        {/* Right Sidebar - AI Settings & Tools */}
        <div className="col-span-3">
          <AISettingsPanel
            selectedCustomer={selectedCustomer}
            onStartAIChat={handleStartAIChat}
            onManualTakeover={() => selectedCustomer && handleManualTakeover(selectedCustomer)}
          />
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
