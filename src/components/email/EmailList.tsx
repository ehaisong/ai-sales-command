
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Mail, MailOpen, Paperclip, AlertCircle } from 'lucide-react';
import { Email } from '@/types/email';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onEmailSelect: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmailId, onEmailSelect }) => {
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

  return (
    <div className="space-y-2">
      {emails.map((email) => {
        const isSelected = selectedEmailId === email.id;
        return (
          <Card 
            key={email.id}
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
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(email.timestamp, { 
                        addSuffix: true, 
                        locale: zhCN 
                      })}
                    </span>
                    {!email.isRead && (
                      <div className="w-2 h-2 bg-monday-blue rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EmailList;
