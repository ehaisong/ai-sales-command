import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  Trash2, 
  Archive, 
  Star,
  Paperclip,
  AlertCircle
} from 'lucide-react';
import { Email } from '@/types/email';
import AIEmailDetail from './AIEmailDetail';

interface EmailDetailProps {
  email: Email | null;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onDelete: (email: Email) => void;
  onArchive: (email: Email) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ 
  email, 
  onReply, 
  onForward, 
  onDelete, 
  onArchive 
}) => {
  const navigate = useNavigate();

  if (!email) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">选择一封邮件来查看详情</p>
        </CardContent>
      </Card>
    );
  }

  // 如果是AI生成的邮件，显示AI专用界面
  if (email.isAIGenerated) {
    return <AIEmailDetail email={email} />;
  }

  const handleReply = () => {
    navigate('/marketing/email/compose', { state: { email } });
  };

  const handleReplyAll = () => {
    navigate('/marketing/email/compose', { state: { email, replyAll: true } });
  };

  const handleForwardClick = () => {
    navigate('/marketing/email/compose', { state: { email, forward: true } });
  };

  const getPriorityColor = (priority: string) => {
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
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
              {getInitials(email.from)}
            </Avatar>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{email.from}</h3>
                {email.isAIGenerated && (
                  <Badge variant="secondary" className="text-xs">AI发送</Badge>
                )}
                <AlertCircle className={`h-4 w-4 ${getPriorityColor(email.priority)}`} />
              </div>
              <p className="text-sm text-muted-foreground">收件人: {email.to}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(email.timestamp, { 
                  addSuffix: true, 
                  locale: zhCN 
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onArchive(email)}>
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(email)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">{email.subject}</h2>
          {email.attachments && email.attachments.length > 0 && (
            <div className="flex items-center space-x-2">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {email.attachments.length} 个附件
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-6">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {email.content}
          </div>
        </div>
      </CardContent>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Button onClick={handleReply} className="flex-1">
            <Reply className="mr-2 h-4 w-4" />
            回复
          </Button>
          <Button variant="outline" onClick={handleReplyAll}>
            <ReplyAll className="mr-2 h-4 w-4" />
            全部回复
          </Button>
          <Button variant="outline" onClick={handleForwardClick}>
            <Forward className="mr-2 h-4 w-4" />
            转发
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EmailDetail;
