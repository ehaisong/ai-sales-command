
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Mail, MailOpen, Paperclip, AlertCircle, UserCheck, Calendar, User } from 'lucide-react';
import { Email } from '@/types/email';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onEmailSelect: (email: Email) => void;
  onManualTakeover?: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ 
  emails, 
  selectedEmailId, 
  onEmailSelect,
  onManualTakeover 
}) => {
  const getPriorityColor = (priority: string, isSelected: boolean) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const handleManualTakeoverClick = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    if (onManualTakeover) {
      onManualTakeover(email);
    }
  };

  return (
    <div className="space-y-2">
      {emails.map((email) => {
        const isSelected = selectedEmailId === email.id;
        return (
          <HoverCard key={email.id}>
            <HoverCardTrigger asChild>
              <Card 
                className={`cursor-pointer transition-colors ${
                  !email.isRead ? 'border-l-4 border-l-monday-blue' : ''
                }`}
                style={{
                  backgroundColor: isSelected ? '#E9EEF5' : undefined
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#E3EAFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
                onClick={() => onEmailSelect(email)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* 发件人头像 */}
                    <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(email.from)}
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            !email.isRead ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {email.from}
                          </span>
                          {email.isAIGenerated && (
                            <Badge variant="secondary" className="text-xs">AI</Badge>
                          )}
                          <AlertCircle className={`h-3 w-3 ${getPriorityColor(email.priority, isSelected)}`} />
                        </div>
                        <div className="flex items-center space-x-2">
                          {email.attachments && email.attachments.length > 0 && (
                            <Paperclip className="h-3 w-3 text-muted-foreground" />
                          )}
                          {email.isRead ? (
                            <MailOpen className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <Mail className="h-3 w-3 text-monday-blue" />
                          )}
                        </div>
                      </div>
                      
                      <h4 className={`text-sm mb-1 ${
                        !email.isRead ? 'font-semibold' : 'font-normal'
                      }`}>
                        {email.subject}
                      </h4>
                      
                      <p className="text-xs mb-2 line-clamp-2 text-muted-foreground">
                        {email.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(email.timestamp, { 
                              addSuffix: true, 
                              locale: zhCN 
                            })}
                          </span>
                          {/* AI邮件的转人工处理按钮 */}
                          {email.isAIGenerated && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                              onClick={(e) => handleManualTakeoverClick(e, email)}
                            >
                              <UserCheck className="h-3 w-3 mr-1" />
                              转人工处理
                            </Button>
                          )}
                        </div>
                        {!email.isRead && (
                          <div className="w-2 h-2 bg-monday-blue rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="right">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-base font-medium">
                    {getInitials(email.from)}
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{email.from}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(email.timestamp, { 
                          addSuffix: true, 
                          locale: zhCN 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{email.subject}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {email.content.length > 200 ? `${email.content.substring(0, 200)}...` : email.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className={`h-4 w-4 ${getPriorityColor(email.priority, false)}`} />
                    <span className="text-sm capitalize">{email.priority} 优先级</span>
                  </div>
                  {email.isAIGenerated && (
                    <Badge variant="secondary">AI 生成</Badge>
                  )}
                </div>
                
                {email.attachments && email.attachments.length > 0 && (
                  <div className="flex items-center space-x-2 pt-2 border-t">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {email.attachments.length} 个附件
                    </span>
                  </div>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default EmailList;
