
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Mail, 
  Bot, 
  Paperclip, 
  Star, 
  Flag,
  Eye,
  EyeOff,
  MoreHorizontal,
  Reply,
  Forward,
  Archive,
  Trash2
} from 'lucide-react';
import { Email } from '@/types/email';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface EnhancedEmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onEmailSelect: (email: Email) => void;
  onEmailAction: (action: string, email: Email) => void;
}

const EnhancedEmailList: React.FC<EnhancedEmailListProps> = ({
  emails,
  selectedEmailId,
  onEmailSelect,
  onEmailAction
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'replied': return 'bg-indigo-100 text-indigo-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const truncateContent = (content: string, maxLength: number = 80) => {
    if (!content) return '无内容';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <Card 
          key={email.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
            selectedEmailId === email.id 
              ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          } ${!email.is_read ? 'bg-white' : 'bg-gray-50'}`}
          onClick={() => onEmailSelect(email)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                <AvatarFallback className="text-white font-medium text-sm">
                  {getInitials(email.from_email)}
                </AvatarFallback>
              </Avatar>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-sm font-medium truncate ${
                      !email.is_read ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {email.from_email}
                    </h4>
                    {email.email_type === 'ai_generated' && (
                      <Badge variant="secondary" className="text-xs">
                        <Bot className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {/* Priority Flag */}
                    <Flag className={`h-3 w-3 ${getPriorityColor(email.priority).split(' ')[0]}`} />
                    
                    {/* Read Status */}
                    {email.is_read ? (
                      <Eye className="h-3 w-3 text-gray-400" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-blue-500" />
                    )}
                    
                    {/* More Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onEmailAction('reply', email);
                        }}>
                          <Reply className="h-4 w-4 mr-2" />
                          回复
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onEmailAction('forward', email);
                        }}>
                          <Forward className="h-4 w-4 mr-2" />
                          转发
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onEmailAction('archive', email);
                        }}>
                          <Archive className="h-4 w-4 mr-2" />
                          归档
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEmailAction('delete', email);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Subject */}
                <p className={`text-sm mb-1 truncate ${
                  !email.is_read ? 'font-medium text-gray-900' : 'text-gray-700'
                }`}>
                  {email.subject}
                </p>

                {/* Content Preview */}
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {truncateContent(email.content || '')}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Status Badge */}
                    <Badge className={`text-xs ${getStatusColor(email.status)}`}>
                      {email.status === 'sent' && '已发送'}
                      {email.status === 'delivered' && '已送达'}
                      {email.status === 'opened' && '已查看'}
                      {email.status === 'replied' && '已回复'}
                      {email.status === 'bounced' && '发送失败'}
                      {email.status === 'draft' && '草稿'}
                    </Badge>

                    {/* Attachments */}
                    {email.attachments?.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{email.attachments.length}</span>
                      </div>
                    )}

                    {/* Tags */}
                    {email.tags?.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(email.created_at, { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {emails.length === 0 && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无邮件</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedEmailList;
