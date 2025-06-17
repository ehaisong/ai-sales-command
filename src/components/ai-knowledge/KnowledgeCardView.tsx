
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash, FileText, Globe, Newspaper, Eye, Edit, MoreHorizontal, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTagStyle } from "@/config/tagConfig";

const sourceConfig = {
  news: {
    icon: Newspaper,
    label: "新闻",
    color: "bg-green-100 text-green-700",
    badgeClassName: "border-green-700 text-green-700",
    bgColor: "bg-green-50",
  },
  website: {
    icon: Globe,
    label: "官网",
    color: "bg-blue-100 text-blue-700",
    badgeClassName: "border-blue-700 text-blue-700",
    bgColor: "bg-blue-50",
  },
  file: {
    icon: FileText,
    label: "文件",
    color: "bg-purple-100 text-purple-700",
    badgeClassName: "border-purple-700 text-purple-700",
    bgColor: "bg-purple-50",
  },
};

type Props = {
  data: any[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onItemClick: (item: any) => void;
};

const KnowledgeCardView = ({ data, selectedItems, onSelectItem, onItemClick }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        const sourceInfo = sourceConfig[item.source as keyof typeof sourceConfig];
        const IconComponent = sourceInfo.icon;
        
        return (
          <Card
            key={item.id}
            className={`p-4 hover:shadow-md transition-all cursor-pointer border-l-4 ${
              selectedItems.includes(item.id) 
                ? 'border-l-monday-blue bg-monday-blue/5' 
                : `border-l-transparent ${sourceInfo.bgColor}`
            }`}
            onClick={() => onItemClick(item)}
          >
            <div>
              <div className="flex items-center gap-4">
                {/* 选择框 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectItem(item.id);
                    }}
                    className="w-4 h-4 text-monday-blue border-gray-300 rounded focus:ring-monday-blue"
                  />
                </div>

                {/* 来源图标 */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sourceInfo.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* 主要内容 - 标题行 */}
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {item.title}
                    <Badge variant="outline" className={`ml-2 text-xs font-normal align-middle ${sourceInfo.badgeClassName}`}>
                      #{sourceInfo.label}
                    </Badge>
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
              </div>

              {/* 剩余内容 */}
              <div className="pl-[5.5rem] mt-2 space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string) => {
                    const { color } = getTagStyle(tag);
                    return (
                      <Badge key={tag} variant="secondary" className={`text-xs font-medium ${color}`}>
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
  );
};

export default KnowledgeCardView;
