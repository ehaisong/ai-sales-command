
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Newspaper, FileUp, Settings } from "lucide-react";

type Props = {
  onUploadFile: () => void;
  onConfig: () => void;
};

const DataSourceCards = ({ onUploadFile, onConfig }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="min-w-[210px] flex-1 flex flex-col items-center p-4 relative">
        <Globe className="w-8 h-8 mb-2 text-blue-500" />
        <div className="font-medium">公司官网自动采集</div>
        <div className="text-xs text-muted-foreground mb-2">每日自动同步</div>
        <Button size="sm" variant="secondary" onClick={onConfig}>
          <Settings className="w-4 h-4 mr-1" /> 配置
        </Button>
      </Card>
      <Card className="min-w-[210px] flex-1 flex flex-col items-center p-4">
        <Newspaper className="w-8 h-8 mb-2 text-green-500" />
        <div className="font-medium">公司新闻监控</div>
        <div className="text-xs text-muted-foreground mb-2">支持主流新闻平台</div>
        <Button size="sm" variant="secondary" onClick={onConfig}>
          <Settings className="w-4 h-4 mr-1" /> 配置
        </Button>
      </Card>
      <Card className="min-w-[210px] flex-1 flex flex-col items-center p-4">
        <FileUp className="w-8 h-8 mb-2 text-purple-500" />
        <div className="font-medium">手动上传文件</div>
        <div className="text-xs text-muted-foreground mb-2">
          支持PDF/Word/图片等
        </div>
        <Button size="sm" onClick={onUploadFile}>
          上传文件
        </Button>
      </Card>
    </div>
  );
};

export default DataSourceCards;
