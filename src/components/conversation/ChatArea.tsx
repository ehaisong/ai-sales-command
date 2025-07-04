
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
  MoreHorizontal,
  AlertCircle,
  Building2
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
      content: '您好，我们公司是一家大型制造企业，对贵公司的产品很感兴趣。希望能获取详细的产品价格清单和技术规格文档，我们有长期合作的可能性。另外，请问是否支持定制化服务？',
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
      attachments: ['公司资质证书.pdf']
    },
    {
      id: 'msg-2',
      conversationId: conversation.id,
      type: 'email',
      direction: 'outbound',
      content: `尊敬的${conversation.customerName}，

感谢您对我们产品的关注和信任。根据您的需求，我已为您准备了详细的产品资料包：

📋 产品优势：
• 高品质材料制造，符合国际ISO标准
• 先进的生产工艺，质量稳定可靠  
• 专业技术团队，提供全方位技术支持
• 完善的售后服务体系

💰 定制服务：
我们支持多种定制方案，可根据您的具体需求调整产品规格。

📞 下一步建议：
建议我们安排一次在线会议，详细讨论您的具体需求和合作方案。

期待与您的进一步沟通！

此致敬礼，
AI业务助手`,
      subject: 'Re: 关于产品询价的问题 - 详细资料已准备',
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
      status: 'sent',
      attachments: ['产品价格清单.xlsx', '技术规格文档.pdf']
    },
    {
      id: 'msg-3',
      conversationId: conversation.id,
      type: 'whatsapp',
      direction: 'inbound',
      content: '谢谢您的详细回复！价格很有竞争力。我们计划下周四安排视频会议，届时会有我们的技术团队参与讨论。',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      isAIGenerated: false,
      sender: {
        name: conversation.customerName,
        phone: conversation.customerPhone
      },
      recipient: {
        name: 'AI Assistant',
        phone: '+86-400-000-0000'
      },
      status: 'delivered'
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
      case 'medium': return 'text-amber-500';
      default: return 'text-gray-400';
    }
  };

  if (!conversation) {
    return (
      <Card className="h-full flex items-center justify-center bg-white border-gray-200">
        <CardContent className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">选择客户开始对话</h3>
          <p className="text-gray-500">从左侧客户列表中选择一个客户，查看对话历史并开始沟通</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col bg-white shadow-sm border-gray-200">
      {/* Enhanced Chat Header */}
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
              {getInitials(conversation.customerName)}
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 text-lg">{conversation.customerName}</h3>
                {conversation.isAIManaged ? (
                  <Badge variant="default" className="bg-blue-100 text-blue-700 text-xs">
                    <Bot className="mr-1 h-3 w-3" />
                    AI管理
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    <User className="mr-1 h-3 w-3" />
                    手动管理
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                {conversation.customerEmail && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{conversation.customerEmail}</span>
                  </div>
                )}
                {conversation.customerPhone && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{conversation.customerPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className={`h-4 w-4 ${getPriorityColor(conversation.priority)}`} />
              <Badge variant="outline" className="text-xs border-gray-200">
                {conversation.priority === 'high' ? '高优先级' : 
                 conversation.priority === 'medium' ? '中优先级' : '低优先级'}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              {conversation.totalMessages} 条消息
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {/* Messages Area */}
      <CardContent className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="space-y-6">
          {mockMessages.map((message, index) => (
            <div key={message.id} className="group">
              <div className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.direction === 'outbound' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.direction === 'inbound' && (
                      <Avatar className="h-6 w-6 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs">
                        {getInitials(message.sender.name)}
                      </Avatar>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      {message.isAIGenerated ? (
                        <div className="flex items-center space-x-1">
                          <Bot className="h-3 w-3 text-blue-500" />
                          <span className="text-blue-600 font-medium">AI助手</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3 text-gray-400" />
                          <span>{message.sender.name}</span>
                        </div>
                      )}
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        {message.type === 'email' ? (
                          <Mail className="h-3 w-3 text-blue-500" />
                        ) : (
                          <MessageCircle className="h-3 w-3 text-green-500" />
                        )}
                        <span>{message.type === 'email' ? '邮件' : 'WhatsApp'}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(message.timestamp, { 
                          addSuffix: true, 
                          locale: zhCN 
                        })}
                      </span>
                    </div>
                    {message.direction === 'outbound' && (
                      <Avatar className="h-6 w-6 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs">
                        <Bot className="h-3 w-3" />
                      </Avatar>
                    )}
                  </div>
                  
                  <div className={`rounded-2xl p-4 shadow-sm ${
                    message.direction === 'outbound'
                      ? message.isAIGenerated 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    {message.subject && (
                      <div className={`font-medium mb-3 pb-2 border-b ${
                        message.direction === 'outbound' ? 'border-white/20' : 'border-gray-200'
                      }`}>
                        {message.subject}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-current/20">
                        <div className="flex items-center space-x-2 text-xs">
                          <Paperclip className="h-3 w-3" />
                          <span>附件: {message.attachments.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      {/* Enhanced Message Input */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant={selectedMessageType === 'email' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMessageType('email')}
            className="text-xs"
          >
            <Mail className="mr-2 h-3 w-3" />
            邮件回复
          </Button>
          <Button
            variant={selectedMessageType === 'whatsapp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMessageType('whatsapp')}
            className="text-xs"
          >
            <MessageCircle className="mr-2 h-3 w-3" />
            WhatsApp
          </Button>
          {conversation.isAIManaged && (
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
              <Bot className="mr-1 h-3 w-3" />
              AI将自动回复
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Textarea
            placeholder={`输入${selectedMessageType === 'email' ? '邮件' : 'WhatsApp'}内容...`}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="flex-1 min-h-[100px] resize-none border-gray-200"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm" className="border-gray-200">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!messageContent.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>按 Ctrl+Enter 快速发送</span>
          <span>{messageContent.length} 字符</span>
        </div>
      </div>
    </Card>
  );
};

export default ChatArea;
