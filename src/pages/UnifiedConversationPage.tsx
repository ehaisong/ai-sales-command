
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Mail,
  Phone,
  Plus,
  Settings
} from 'lucide-react';
import ConversationSidebar from '@/components/conversation/ConversationSidebar';
import ChatArea from '@/components/conversation/ChatArea';
import CustomerInfoPanel from '@/components/conversation/CustomerInfoPanel';
import { UnifiedConversation, UnifiedMessage, ConversationFilter } from '@/types/conversation';

const UnifiedConversationPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<UnifiedConversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ConversationFilter>({
    channel: 'all',
    status: 'all',
    priority: 'all',
    aiGenerated: 'all'
  });
  const { toast } = useToast();

  // Mock conversation data - in real app this would come from API
  const mockConversations: UnifiedConversation[] = [
    {
      id: '1',
      customerId: 'customer-1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      customerPhone: '+1-555-0123',
      customerAvatar: undefined,
      lastMessage: {
        id: 'msg-1',
        conversationId: '1',
        type: 'email',
        direction: 'inbound',
        content: '您好，我对贵公司的产品很感兴趣，希望能获取详细的价格清单和技术规格。',
        subject: '关于产品询价的问题',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        isAIGenerated: false,
        sender: {
          name: 'John Smith',
          email: 'john.smith@example.com'
        },
        recipient: {
          name: 'AI Assistant',
          email: 'ai@company.com'
        },
        status: 'delivered',
        attachments: ['产品规格.pdf']
      },
      unreadCount: 1,
      totalMessages: 3,
      channels: ['email'],
      tags: ['重要客户', '产品询价'],
      priority: 'high',
      status: 'active',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      customerId: 'customer-2',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah.wilson@partner.com',
      customerPhone: '+1-555-0456',
      lastMessage: {
        id: 'msg-2',
        conversationId: '2',
        type: 'whatsapp',
        direction: 'outbound',
        content: '感谢您的询问！我们的AI助手已为您准备了详细的合作方案，请查收。',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true,
        isAIGenerated: true,
        sender: {
          name: 'AI Assistant',
          phone: '+1-555-0999'
        },
        recipient: {
          name: 'Sarah Wilson',
          phone: '+1-555-0456'
        },
        status: 'read'
      },
      unreadCount: 0,
      totalMessages: 8,
      channels: ['whatsapp', 'email'],
      tags: ['合作伙伴', 'VIP客户'],
      priority: 'medium',
      status: 'active',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  // Filter conversations based on search and filters
  const filteredConversations = useMemo(() => {
    let conversations = mockConversations;
    
    // Apply search filter
    if (searchQuery) {
      conversations = conversations.filter(conv => 
        conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply channel filter
    if (filter.channel && filter.channel !== 'all') {
      conversations = conversations.filter(conv => 
        conv.channels.includes(filter.channel as 'email' | 'whatsapp')
      );
    }
    
    // Apply status filter
    if (filter.status && filter.status !== 'all') {
      conversations = conversations.filter(conv => conv.status === filter.status);
    }
    
    // Apply priority filter
    if (filter.priority && filter.priority !== 'all') {
      conversations = conversations.filter(conv => conv.priority === filter.priority);
    }
    
    return conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [searchQuery, filter]);

  const handleConversationSelect = (conversation: UnifiedConversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (content: string, type: 'email' | 'whatsapp') => {
    console.log('发送消息:', { content, type, conversationId: selectedConversation?.id });
    toast({
      title: "消息已发送",
      description: `${type === 'email' ? '邮件' : 'WhatsApp消息'}已成功发送`,
    });
  };

  const handleNewConversation = () => {
    console.log('创建新对话');
    toast({
      title: "创建新对话",
      description: "新对话功能开发中...",
    });
  };

  return (
    <div className="p-6 h-full bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">营销对话</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索对话、客户或消息内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-white"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
            <Button onClick={handleNewConversation} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              新对话
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Left Sidebar - Conversations */}
        <div className="col-span-3">
          <ConversationSidebar
            conversations={filteredConversations}
            selectedConversationId={selectedConversation?.id || null}
            onConversationSelect={handleConversationSelect}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        {/* Center - Chat Area */}
        <div className="col-span-6">
          <ChatArea
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Sidebar - Customer Info & Tools */}
        <div className="col-span-3">
          <CustomerInfoPanel
            conversation={selectedConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default UnifiedConversationPage;
