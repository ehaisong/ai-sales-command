
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Mail, 
  MessageCircle,
  AlertCircle,
  Clock,
  Bot,
  User,
  UserX
} from 'lucide-react';
import { CustomerConversationSummary } from '@/types/conversation';

interface CustomerConversationsListProps {
  customers: CustomerConversationSummary[];
  selectedCustomerId: string | null;
  onCustomerSelect: (customer: CustomerConversationSummary) => void;
  onManualTakeover: (customer: CustomerConversationSummary) => void;
}

const CustomerConversationsList: React.FC<CustomerConversationsListProps> = ({
  customers,
  selectedCustomerId,
  onCustomerSelect,
  onManualTakeover
}) => {
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

  const getChannelIcons = (channels: string[]) => {
    return (
      <div className="flex items-center space-x-1">
        {channels.includes('email') && <Mail className="h-3 w-3 text-blue-500" />}
        {channels.includes('whatsapp') && <MessageCircle className="h-3 w-3 text-green-500" />}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col bg-white shadow-sm border-gray-200">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="text-lg flex items-center justify-between text-gray-800">
          客户对话
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
            {customers.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto p-0">
        <div className="space-y-1">
          {customers.map((customer) => {
            const isSelected = selectedCustomerId === customer.id;
            return (
              <div
                key={customer.id}
                className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-50 hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => onCustomerSelect(customer)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(customer.name)}
                    </Avatar>
                    {customer.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                        {customer.unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium truncate ${
                        customer.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {customer.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {getChannelIcons(customer.channels)}
                        <AlertCircle className={`h-3 w-3 ${getPriorityColor(customer.priority)}`} />
                      </div>
                    </div>
                    
                    {customer.company && (
                      <p className="text-xs text-gray-500 mb-1">{customer.company}</p>
                    )}
                    
                    <div className="flex items-center space-x-2 mb-2">
                      {customer.isAIManaged ? (
                        <div className="flex items-center space-x-1">
                          <Bot className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-blue-600">AI管理</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600">手动管理</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(customer.lastContactDate, { 
                            addSuffix: true, 
                            locale: zhCN 
                          })}
                        </span>
                      </div>
                      
                      {customer.isAIManaged && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            onManualTakeover(customer);
                          }}
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          接管
                        </Button>
                      )}
                    </div>
                    
                    {customer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {customer.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0 bg-gray-50 text-gray-600 border-gray-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerConversationsList;
