import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Trash, FileText, Globe, Newspaper, Eye, Edit, MoreHorizontal, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTagStyle } from "@/config/tagConfig";

// 模拟数据
const mockKnowledge = [
  {
    id: 1,
    title: "公司年度新品发布会圆满成功 - AI智能家居系列产品正式发布",
    summary: "本次发布会展示了包括智能音箱、智能门锁、智能照明系统在内的多款创新产品，吸引了众多行业专家和媒体的关注，预计将在智能家居市场掀起新的浪潮...",
    source: "news",
    tags: ["新品发布", "智能家居", "AI技术", "创新"],
    updatedAt: "2024-06-01",
    viewCount: 156,
    confidence: 92,
  },
  {
    id: 2,
    title: "关于我们 - 公司发展历程与企业文化",
    summary: "我们公司成立于2012年，专注于智能家居领域的技术研发与产品创新。经过十多年的发展，已成为行业领先的智能家居解决方案提供商，服务全球超过100万家庭...",
    source: "website",
    tags: ["公司介绍", "发展历程", "企业文化", "智能家居"],
    updatedAt: "2024-05-30",
    viewCount: 89,
    confidence: 88,
  },
  {
    id: 3,
    title: "A100智能音箱产品说明书及技术规格",
    summary: "A100智能音箱是我们最新推出的旗舰产品，搭载先进的语音识别技术和AI助手功能。支持多种音乐平台，具备智能家居控制中心功能，是现代家庭的理想选择...",
    source: "file",
    tags: ["A100", "智能音箱", "产品说明", "技术规格"],
    updatedAt: "2024-05-20",
    viewCount: 234,
    confidence: 95,
  },
  {
    id: 4,
    title: "智能门锁B200系列安装与使用指南",
    summary: "B200系列智能门锁采用指纹识别、密码输入、刷卡开锁等多种开锁方式，支持远程监控和临时密码功能。本指南详细介绍了产品的安装步骤和使用方法...",
    source: "file",
    tags: ["B200", "智能门锁", "安装指南", "多重认证"],
    updatedAt: "2024-05-18",
    viewCount: 178,
    confidence: 91,
  },
];

const sourceConfig = {
  news: { 
    icon: Newspaper, 
    label: "新闻", 
    color: "bg-green-100 text-green-700",
    bgColor: "bg-green-50"
  },
  website: { 
    icon: Globe, 
    label: "官网", 
    color: "bg-blue-100 text-blue-700",
    bgColor: "bg-blue-50"
  },
  file: { 
    icon: FileText, 
    label: "文件", 
    color: "bg-purple-100 text-purple-700",
    bgColor: "bg-purple-50"
  },
};

type Props = {
  searchQuery: string;
  onSelectItem: (item: any) => void;
};

const KnowledgeList = ({ searchQuery, onSelectItem }: Props) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 根据搜索词过滤数据
  const filteredKnowledge = mockKnowledge.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">知识库内容</h2>
          <p className="text-sm text-gray-500 mt-1">
            共 {filteredKnowledge.length} 条记录
            {searchQuery && ` · 搜索: "${searchQuery}"`}
            {selectedItems.length > 0 && ` · 已选择 ${selectedItems.length} 项`}
          </p>
        </div>
        {selectedItems.length > 0 && (
          <Button size="sm" variant="destructive">
            <Trash className="w-4 h-4 mr-2" />
            删除选中 ({selectedItems.length})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {filteredKnowledge.map((item) => {
          const sourceInfo = sourceConfig[item.source as keyof typeof sourceConfig];
          const IconComponent = sourceInfo.icon;
          
          return (
            <Card
              key={item.id}
              className={`p-6 hover:shadow-md transition-all cursor-pointer border-l-4 ${
                selectedItems.includes(item.id) 
                  ? 'border-l-primary bg-primary/5' 
                  : `border-l-transparent ${sourceInfo.bgColor}`
              }`}
              onClick={() => onSelectItem(item)}
            >
              <div className="flex items-start gap-4">
                {/* 选择框 */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectItem(item.id);
                    }}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </div>

                {/* 来源图标 */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sourceInfo.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* 主要内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-2 flex-shrink-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑内容
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((tag) => {
                      const { icon: Icon, color, iconColor } = getTagStyle(tag);
                      return (
                        <Badge key={tag} variant="secondary" className={`text-xs font-medium ${color}`}>
                          <Icon className={`w-3 h-3 mr-1.5 ${iconColor}`} />
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.updatedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.viewCount} 次查看</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${sourceInfo.color}`}>
                        {sourceInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>AI置信度: </span>
                      <span className={`font-medium ${
                        item.confidence >= 90 ? 'text-green-600' : 
                        item.confidence >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredKnowledge.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关内容</h3>
            <p className="text-gray-500">
              {searchQuery ? `没有找到包含 "${searchQuery}" 的内容` : '知识库为空，请先添加内容'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeList;
