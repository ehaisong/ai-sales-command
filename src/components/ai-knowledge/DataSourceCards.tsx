
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, FileUp, Settings, CheckCircle, Hash } from "lucide-react";
import TagCloud from "./TagCloud";

type Props = {
  onUploadFile: () => void;
  onConfig: () => void;
};

const DataSourceCards = ({ onUploadFile, onConfig }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 公司官网自动采集 */}
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">官网自动采集</h3>
              <p className="text-sm text-gray-500">实时同步官网内容</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            运行中
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">采集页面:</span>
            <span className="font-medium">23页</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">最后更新:</span>
            <span className="font-medium">2小时前</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">更新频率:</span>
            <span className="font-medium">每日一次</span>
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={onConfig} className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          采集网址配置
        </Button>
      </Card>

      {/* 产品标签云 - 移到原新闻监控卡片位置 */}
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">产品标签云</h3>
              <p className="text-sm text-gray-500">智能产品定位标签</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            就绪
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">标签总数:</span>
            <span className="font-medium">12个</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">热门标签:</span>
            <span className="font-medium">智能家居</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">更新状态:</span>
            <span className="font-medium">实时更新</span>
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={onConfig} className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          调整产品定位标签
        </Button>
      </Card>

      {/* 手动文件上传 */}
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">文件上传</h3>
              <p className="text-sm text-gray-500">手动上传企业文档</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            就绪
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">已上传文件:</span>
            <span className="font-medium">45个</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">支持格式:</span>
            <span className="font-medium">PDF, Word, Excel</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">存储空间:</span>
            <span className="font-medium">1.2GB / 10GB</span>
          </div>
        </div>

        <Button size="sm" onClick={onUploadFile} className="w-full">
          <FileUp className="w-4 h-4 mr-2" />
          上传新文件
        </Button>
      </Card>
    </div>
  );
};

export default DataSourceCards;
