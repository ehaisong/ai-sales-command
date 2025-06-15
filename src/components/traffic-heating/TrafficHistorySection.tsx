import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { History, MoreHorizontal, Pause, Play, Square, Trash2, RotateCcw } from "lucide-react";
import { TrafficHeatingRecord } from "@/types/trafficHeating";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TrafficHistorySectionProps {
  records: TrafficHeatingRecord[];
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
  onRestart: (record: TrafficHeatingRecord) => void;
}

const TrafficHistorySection: React.FC<TrafficHistorySectionProps> = ({
  records,
  onPause,
  onResume,
  onStop,
  onDelete,
  onRestart
}) => {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    recordId?: string;
    record?: TrafficHeatingRecord;
    actionType?: 'delete' | 'restart';
  }>({ isOpen: false });

  const getStatusBadge = (status: TrafficHeatingRecord['status']) => {
    const statusConfig = {
      pending: { label: '待开始', className: 'bg-gray-100 text-gray-700' },
      running: { label: '进行中', className: 'bg-green-100 text-green-700' },
      completed: { label: '已完成', className: 'bg-blue-100 text-blue-700' },
      paused: { label: '已暂停', className: 'bg-yellow-100 text-yellow-700' },
      cancelled: { label: '已取消', className: 'bg-red-100 text-red-700' }
    };

    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const handleRestartClick = (record: TrafficHeatingRecord) => {
    setDialogState({ isOpen: true, record, actionType: 'restart' });
  };

  const handleDeleteClick = (id: string) => {
    setDialogState({ isOpen: true, recordId: id, actionType: 'delete' });
  };

  const handleConfirmAction = () => {
    if (dialogState.actionType === 'delete' && dialogState.recordId) {
      onDelete(dialogState.recordId);
    } else if (dialogState.actionType === 'restart' && dialogState.record) {
      onRestart(dialogState.record);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialogState({ isOpen: false });
  };

  const getActionButtons = (record: TrafficHeatingRecord) => {
    if (record.status === 'running') {
      return (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPause(record.id)}
            className="p-1 h-6 w-6"
          >
            <Pause className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStop(record.id)}
            className="p-1 h-6 w-6"
          >
            <Square className="w-3 h-3" />
          </Button>
        </div>
      );
    }
    
    if (record.status === 'paused') {
      return (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onResume(record.id)}
            className="p-1 h-6 w-6"
          >
            <Play className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStop(record.id)}
            className="p-1 h-6 w-6"
          >
            <Square className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    if (record.status === 'completed' || record.status === 'cancelled') {
      return (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleRestartClick(record)}
            className="p-1 h-6 w-6 text-green-600 hover:bg-green-50 hover:border-green-300"
            title="重新开始"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteClick(record.id)}
            className="p-1 h-6 w-6 text-red-600 hover:bg-red-50 hover:border-red-300"
            title="删除"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            流量加热历史
          </CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>暂无流量加热记录</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 bg-gray-300 rounded-sm flex-shrink-0"></div>
                      <p className="font-medium text-gray-900 truncate">
                        {record.websiteTitle || record.websiteUrl}
                      </p>
                      {getStatusBadge(record.status)}
                    </div>
                    <p className="text-sm text-gray-500 truncate mb-2">
                      {record.websiteUrl}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">流量设置:</span> {record.dailyTraffic}/天 × {record.durationDays}天
                      </div>
                      <div>
                        <span className="font-medium">扣除积分:</span> {record.pointsDeducted}
                      </div>
                      <div>
                        <span className="font-medium">开始时间:</span> {formatDate(record.startTime)}
                      </div>
                      <div>
                        <span className="font-medium">结束时间:</span> {formatDate(record.endTime)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    {record.remainingDays && record.remainingDays > 0 && (
                      <div className="text-right text-xs text-gray-500">
                        <div>剩余</div>
                        <div className="font-medium">{record.remainingDays}天</div>
                      </div>
                    )}
                    {getActionButtons(record)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <AlertDialog open={dialogState.isOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
        <AlertDialogContent>
          {dialogState.actionType === 'restart' && dialogState.record && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>确认重新开始?</AlertDialogTitle>
                <AlertDialogDescription>
                  您确定要为网站 <span className="font-semibold">{dialogState.record.websiteUrl}</span> 重新开始流量加热吗? 这将根据原设置创建一个新的加热任务，并扣除相应积分。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmAction}>
                  确认
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
          {dialogState.actionType === 'delete' && (
             <>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除?</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作无法撤销。您确定要永久删除此条记录吗?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmAction}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  删除
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrafficHistorySection;
