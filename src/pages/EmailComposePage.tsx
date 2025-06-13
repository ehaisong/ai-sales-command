
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Save, Paperclip } from 'lucide-react';
import CustomerInfoPanel from '@/components/email/CustomerInfoPanel';
import ConversationHistory from '@/components/email/ConversationHistory';
import AIAssistantChat from '@/components/email/AIAssistantChat';
import { Email } from '@/types/email';

const EmailComposePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalEmail = location.state?.email as Email | null;
  
  const [to, setTo] = useState(originalEmail?.from || '');
  const [subject, setSubject] = useState(originalEmail ? `Re: ${originalEmail.subject}` : '');
  const [content, setContent] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');

  const handleSend = () => {
    console.log('发送邮件:', { to, subject, content });
    // 实现发送逻辑
    navigate('/marketing/email');
  };

  const handleSave = () => {
    console.log('保存草稿:', { to, subject, content });
    // 实现保存草稿逻辑
  };

  const handleBack = () => {
    navigate('/marketing/email');
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <h1 className="text-2xl font-bold">
            {originalEmail ? '回复邮件' : '写邮件'}
          </h1>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存草稿
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            发送
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* 左侧：邮件编写区域 */}
        <div className="xl:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>邮件内容</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">收件人</label>
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="输入收件人邮箱"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">抄送</label>
                    <Input
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      placeholder="抄送（可选）"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">密送</label>
                    <Input
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      placeholder="密送（可选）"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">主题</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="输入邮件主题"
                  />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <label className="text-sm font-medium mb-1 block">正文</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="输入邮件内容..."
                  className="flex-1 min-h-[300px] resize-none"
                />
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  添加附件
                </Button>
                <div className="text-xs text-muted-foreground">
                  {content.length} 字符
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：客户信息和历史对话 */}
        <div className="xl:col-span-2 space-y-6">
          {/* 客户资料 */}
          <CustomerInfoPanel email={originalEmail?.from} />
          
          {/* 历史对话 */}
          {originalEmail && <ConversationHistory originalEmail={originalEmail} />}
          
          {/* AI助手对话框 */}
          <AIAssistantChat />
        </div>
      </div>
    </div>
  );
};

export default EmailComposePage;
