
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Send, 
  Mail, 
  MessageCircle,
  Paperclip,
  Bot,
  User,
  Phone,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';
import { UnifiedConversation, UnifiedMessage } from '@/types/conversation';

interface ChatAreaProps {
  conversation: UnifiedConversation | null;
  onSendMessage: (content: string, type: 'email' | 'whatsapp') => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, onSendMessage }) => {
  const [messageContent, setMessageContent] = useState('');
  const [selectedMessageType, setSelectedMessageType] = useState<'email' | 'whatsapp'>('email');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages for the selected conversation
  const mockMessages: UnifiedMessage[] = conversation ? [
    {
      id: 'msg-1',
      conversationId: conversation.id,
      type: 'email',
      direction: 'inbound',
      content: '您好，我对贵公司的产品很感兴趣，希望能获取详细的价格清单和技术规格。我们公司是一家大型制造企业，有长期合作的可能性。期待您的回复。',
      subject: '关于产品询价的问题',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      isAIGenerated: false,
      sender: {
        name: conversation.customerName,
        email: conversation.customerEmail
      },
      recipient: {
        name: 'AI Assistant',
        email: 'ai@company.com'
      },
      status: 'delivered',
      attachments: ['产品规格.pdf']
    },
    {
      id: 'msg-2',
      conversationId: conversation.id,
      type: 'email',
      direction: 'outbound',
      content: '尊敬的客户，\n\n感谢您对我们产品的关注。根据您的需求，我已为您准备了详细的产品价格清单和技术规格文档。\n\n我们的产品具有以下优势：\n1. 高品质材料制造\n2. 符合国际标准\n3. 优质的售后服务\n4. 具有竞争力的价格\n\n如需进一步讨论，请随时联系我们。\n\n此致敬礼，\nAI业务助手',
      subject: 'Re: 关于产品询价的问题',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isAIGenerated: true,
      sender: {
        name: 'AI Assistant',
        email: 'ai@company.com'
      },
      recipient: {
        name: conversation.customerName,
        email: conversation.customerEmail
      },
      status: 'sent'
    }
  ] : [];

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      onSendMessage(messageContent, selectedMessageType);
      setMessageContent('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  if (!conversation) {
    return (
      <Card className="h-full flex items-center justify-center bg-white">
        <CardContent className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">选择一个对话开始沟通</h3>
          <p className="text-gray-500">从左侧列表中选择客户对话，开始您的营销沟通</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col bg-white shadow-sm">
      {/* Chat Header */}
      <CardHeader className="border-b bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
              {getInitials(conversation.customerName)}
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{conversation.customerName}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{conversation.customerEmail}</span>
                {conversation.customerPhone && (
                  <>
                    <span>•</span>
                    <span>{conversation.customerPhone}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertCircle className={`h-4 w-4 ${getPriorityColor(conversation.priority)}`} />
            <Badge variant="outline" className="text-xs">
              {conversation.priority === 'high' ? '高优先级' : 
               conversation.priority === 'medium' ? '中优先级' : '低优先级'}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {/* Messages Area */}
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.direction === 'outbound' ? 'order-2' : 'order-1'}`}>
              <div className="flex items-center space-x-2 mb-1">
                {message.direction === 'inbound' && (
                  <Avatar className="h-6 w-6 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs">
                    {getInitials(message.sender.name)}
                  </Avatar>
                )}
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  {message.isAIGenerated ? (
                    <Bot className="h-3 w-3 text-blue-500" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                  <span>{message.sender.name}</span>
                  <span>•</span>
                  <span>
                    {message.type === 'email' ? (
                      <Mail className="h-3 w-3 inline mr-1" />
                    ) : (
                      <MessageCircle className="h-3 w-3 inline mr-1" />
                    )}
                    {message.type === 'email' ? '邮件' : 'WhatsApp'}
                  </span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(message.timestamp, { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
                {message.direction === 'outbound' && (
                  <Avatar className="h-6 w-6 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs">
                    AI
                  </Avatar>
                )}
              </div>
              
              <div className={`rounded-lg p-3 ${
                message.direction === 'outbound'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.subject && (
                  <div className="font-medium mb-2 pb-2 border-b border-current/20">
                    {message.subject}
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2 text-xs">
                    <Paperclip className="h-3 w-3" />
                    <span>{message.attachments.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      
      {/* Message Input */}
      <div className="border-t p-4 bg-gray-50/50">
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant={selectedMessageType === 'email' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMessageType('email')}
          >
            <Mail className="mr-2 h-4 w-4" />
            邮件回复
          </Button>
          <Button
            variant={selectedMessageType === 'whatsapp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMessageType('whatsapp')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Textarea
            placeholder={`输入${selectedMessageType === 'email' ? '邮件' : 'WhatsApp'}内容...`}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="flex-1 min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!messageContent.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatArea;
