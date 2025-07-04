
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Mail, 
  Phone, 
  MessageCircle,
  AlertCircle,
  Clock,
  Bot,
  User
} from 'lucide-react';
import { UnifiedConversation, ConversationFilter } from '@/types/conversation';

interface ConversationSidebarProps {
  conversations: UnifiedConversation[];
  selectedConversationId: string | null;
  onConversationSelect: (conversation: UnifiedConversation) => void;
  filter: ConversationFilter;
  onFilterChange: (filter: ConversationFilter) => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  filter,
  onFilterChange
}) => {
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

  const getChannelIcon = (channels: string[]) => {
    if (channels.includes('email') && channels.includes('whatsapp')) {
      return (
        <div className="flex items-center space-x-1">
          <Mail className="h-3 w-3" />
          <MessageCircle className="h-3 w-3" />
        </div>
      );
    } else if (channels.includes('email')) {
      return <Mail className="h-3 w-3" />;
    } else {
      return <MessageCircle className="h-3 w-3" />;
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          对话列表
          <Badge variant="secondary" className="text-xs">
            {conversations.length}
          </Badge>
        </CardTitle>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="all" 
              className="text-xs"
              onClick={() => onFilterChange({ ...filter, channel: 'all' })}
            >
              全部
            </TabsTrigger>
            <TabsTrigger 
              value="email" 
              className="text-xs"
              onClick={() => onFilterChange({ ...filter, channel: 'email' })}
            >
              <Mail className="mr-1 h-3 w-3" />
              邮件
            </TabsTrigger>
            <TabsTrigger 
              value="whatsapp" 
              className="text-xs"
              onClick={() => onFilterChange({ ...filter, channel: 'whatsapp' })}
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              WhatsApp
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto p-4 space-y-2">
        {conversations.map((conversation) => {
          const isSelected = selectedConversationId === conversation.id;
          return (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                isSelected 
                  ? 'bg-primary/5 border-primary/20 shadow-sm' 
                  : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
              onClick={() => onConversationSelect(conversation)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(conversation.customerName)}
                  </Avatar>
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium truncate ${
                      conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {conversation.customerName}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(conversation.channels)}
                      <AlertCircle className={`h-3 w-3 ${getPriorityColor(conversation.priority)}`} />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    {conversation.lastMessage.isAIGenerated ? (
                      <Bot className="h-3 w-3 text-blue-500" />
                    ) : (
                      <User className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-xs text-gray-500">
                      {conversation.lastMessage.type === 'email' ? '邮件' : 'WhatsApp'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {conversation.lastMessage.subject && (
                      <span className="font-medium">{conversation.lastMessage.subject}: </span>
                    )}
                    {conversation.lastMessage.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(conversation.lastMessage.timestamp, { 
                          addSuffix: true, 
                          locale: zhCN 
                        })}
                      </span>
                    </div>
                    
                    {conversation.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {conversation.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ConversationSidebar;
