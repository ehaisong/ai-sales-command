import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Bell, User, AlertCircle, TrendingUp, Settings, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: Date;
  read: boolean;
  details?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '客户询盘',
    message: '来自美国的客户对LED灯具产品感兴趣',
    type: 'info',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    read: false,
    details: '客户John Smith通过官网询盘表单提交了对LED灯具产品的询盘，预计采购量1000件，希望获得报价和样品。客户主要关注产品的功率、亮度和认证情况。建议尽快回复并提供详细的产品规格和价格信息。'
  },
  {
    id: '2',
    title: '系统更新',
    message: 'AI助手功能已升级，新增多语言支持',
    type: 'success',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    read: false,
    details: '本次更新包含：1. 新增支持15种语言的自动翻译功能；2. 优化AI回复准确性；3. 增强客户意图识别能力；4. 修复已知问题。所有用户可立即使用新功能，无需额外设置。'
  },
  {
    id: '3',
    title: '数据异常',
    message: '检测到流量数据异常波动',
    type: 'warning',
    time: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
    read: true,
    details: '系统监测到您的网站流量在过去4小时内出现异常波动，访问量比平时增加了150%。建议检查：1. 是否有营销活动正在进行；2. 网站服务器性能是否正常；3. 是否存在恶意访问。如需技术支持请联系客服。'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return <User className="h-4 w-4 text-blue-500" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'success':
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case 'error':
      return <X className="h-4 w-4 text-red-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getNotificationBgColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'bg-blue-50 border-blue-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'success':
      return 'bg-green-50 border-green-200';
    case 'error':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.details) {
      setSelectedNotification(notification);
      setIsDetailDialogOpen(true);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0 bg-background border border-border shadow-lg z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">通知</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  全部已读
                </Button>
              )}
            </div>
          </div>
          
          <ScrollArea className="max-h-96">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">暂无通知</p>
              </div>
            ) : (
              <div className="p-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg mb-1 cursor-pointer transition-colors hover:bg-accent/50 ${
                      !notification.read ? 'bg-accent/20' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-medium truncate ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(notification.time, { 
                            addSuffix: true, 
                            locale: zhCN 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                查看全部通知
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 通知详情弹窗 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              {selectedNotification && getNotificationIcon(selectedNotification.type)}
              <DialogTitle>{selectedNotification?.title}</DialogTitle>
            </div>
            <DialogDescription>
              {selectedNotification && formatDistanceToNow(selectedNotification.time, { 
                addSuffix: true, 
                locale: zhCN 
              })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="mt-4">
              <Card className={getNotificationBgColor(selectedNotification.type)}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{selectedNotification.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedNotification.message}
                  </p>
                  {selectedNotification.details && (
                    <div className="bg-background rounded-lg p-3 border">
                      <h4 className="text-sm font-medium mb-2">详细信息</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedNotification.details}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationDropdown;